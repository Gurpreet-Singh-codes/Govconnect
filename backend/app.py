
import os
import bcrypt
import jwt
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, Column, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import uuid

# Create Flask app
app = Flask(__name__)

# Enable CORS
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-prototype')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-prototype')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Database setup (SQLite for simplicity)
basedir = os.path.abspath(os.path.dirname(__file__))
database_url = os.environ.get('DATABASE_URL', f'sqlite:///{os.path.join(basedir, "govconnect.db")}')

engine = create_engine(database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class User(Base):
    __tablename__ = 'users'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    role = Column(String(20), default='user')
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'role': self.role,
            'created_at': self.created_at.isoformat()
        }

class Internship(Base):
    __tablename__ = 'internships'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(100), nullable=False)
    department = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    requirements = Column(Text)
    status = Column(String(20), default='draft')
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'department': self.department,
            'description': self.description,
            'requirements': self.requirements,
            'status': self.status,
            'created_at': self.created_at.isoformat()
        }

class Application(Base):
    __tablename__ = 'applications'
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    applicant_name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    university = Column(String(100), nullable=False)
    major = Column(String(100), nullable=False)
    status = Column(String(20), default='pending')
    internship_id = Column(String(36), ForeignKey('internships.id'))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'applicant_name': self.applicant_name,
            'email': self.email,
            'university': self.university,
            'major': self.major,
            'status': self.status,
            'internship_id': self.internship_id,
            'created_at': self.created_at.isoformat()
        }

# Create tables
Base.metadata.create_all(bind=engine)

# Helper functions
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(hashed_password, password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_token(user_id, email, role):
    payload = {
        'sub': user_id,
        'email': email,
        'role': role,
        'exp': datetime.utcnow() + app.config['JWT_ACCESS_TOKEN_EXPIRES']
    }
    return jwt.encode(payload, app.config['JWT_SECRET_KEY'], algorithm='HS256')

def verify_token(token):
    try:
        payload = jwt.decode(token, app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def token_required(f):
    def decorated(*args, **kwargs):
        token = None
        
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        payload = verify_token(token)
        if not payload:
            return jsonify({'error': 'Token is invalid'}), 401
        
        request.current_user = payload
        return f(*args, **kwargs)
    return decorated

# Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        db = next(get_db())
        
        required = ['email', 'password', 'first_name', 'last_name']
        for field in required:
            if not data.get(field):
                return jsonify({'error': f'Missing {field}'}), 400
        
        if db.query(User).filter_by(email=data['email']).first():
            return jsonify({'error': 'User already exists'}), 409
        
        user = User(
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            role=data.get('role', 'user')
        )
        user.password_hash = hash_password(data['password'])
        
        db.add(user)
        db.commit()
        
        token = create_token(user.id, user.email, user.role)
        
        return jsonify({
            'message': 'User created',
            'user': user.to_dict(),
            'token': token
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        db = next(get_db())
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password required'}), 400
        
        user = db.query(User).filter_by(email=data['email']).first()
        if not user or not verify_password(user.password_hash, data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        token = create_token(user.id, user.email, user.role)
        
        return jsonify({
            'message': 'Login successful',
            'user': user.to_dict(),
            'token': token
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/internships', methods=['GET'])
@token_required
def get_internships():
    try:
        db = next(get_db())
        status = request.args.get('status', 'all')
        
        query = db.query(Internship)
        if status != 'all':
            query = query.filter_by(status=status)
        
        internships = query.order_by(Internship.created_at.desc()).all()
        
        return jsonify({
            'internships': [i.to_dict() for i in internships]
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/internships', methods=['POST'])
@token_required
def create_internship():
    try:
        data = request.get_json()
        db = next(get_db())
        
        required = ['title', 'department', 'description']
        for field in required:
            if not data.get(field):
                return jsonify({'error': f'Missing {field}'}), 400
        
        internship = Internship(
            title=data['title'],
            department=data['department'],
            description=data['description'],
            requirements=data.get('requirements', ''),
            status=data.get('status', 'draft')
        )
        
        db.add(internship)
        db.commit()
        
        return jsonify({
            'message': 'Internship created',
            'internship': internship.to_dict()
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/applications', methods=['POST'])
def create_application():
    try:
        data = request.get_json()
        db = next(get_db())
        
        required = ['applicant_name', 'email', 'university', 'major', 'internship_id']
        for field in required:
            if not data.get(field):
                return jsonify({'error': f'Missing {field}'}), 400
        
        if not db.query(Internship).get(data['internship_id']):
            return jsonify({'error': 'Internship not found'}), 404
        
        application = Application(
            applicant_name=data['applicant_name'],
            email=data['email'],
            university=data['university'],
            major=data['major'],
            internship_id=data['internship_id'],
            status='pending'
        )
        
        db.add(application)
        db.commit()
        
        return jsonify({
            'message': 'Application submitted',
            'application': application.to_dict()
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/dashboard/stats', methods=['GET'])
@token_required
def get_dashboard_stats():
    try:
        db = next(get_db())
        
        total_internships = db.query(Internship).count()
        total_applications = db.query(Application).count()
        open_internships = db.query(Internship).filter_by(status='open').count()
        pending_applications = db.query(Application).filter_by(status='pending').count()
        
        return jsonify({
            'total_internships': total_internships,
            'total_applications': total_applications,
            'open_internships': open_internships,
            'pending_applications': pending_applications
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'GovConnect API is running'})

if __name__ == '__main__':
    print("Starting GovConnect API server...")
    print("Available endpoints:")
    print("  GET  /api/health")
    print("  POST /api/auth/register")
    print("  POST /api/auth/login")
    print("  GET  /api/internships")
    print("  POST /api/internships")
    print("  POST /api/applications")
    print("  GET  /api/dashboard/stats")
    
    app.run(debug=True, host='0.0.0.0', port=5000)