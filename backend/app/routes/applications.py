from flask import Blueprint, request, jsonify
from app.models import db, Application, Internship
from app.mlmodels.application_scoring import calculate_ai_score, extract_skills, generate_ai_summary

applications_bp = Blueprint('applications', __name__)

@applications_bp.route('/', methods=['GET'])
def get_applications():
    try:
        status_filter = request.args.get('status', 'all')
        page = int(request.args.get('page', 1))
        per_page = min(int(request.args.get('per_page', 10)), 50)
        
        # Build query
        query = Application.query
        
        if status_filter != 'all':
            query = query.filter(Application.status == status_filter)
        
        # Pagination
        applications = query.order_by(Application.created_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'applications': [app.to_dict() for app in applications.items],
            'total': applications.total,
            'pages': applications.pages,
            'current_page': page
        })
        
    except Exception as e:
        return jsonify({'error': str(e), 'message': 'Failed to fetch applications'}), 500

@applications_bp.route('/', methods=['POST'])
def create_application():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['applicant_name', 'email', 'university', 'major', 'internship_id']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Check if internship exists
        internship = Internship.query.get(data['internship_id'])
        if not internship:
            return jsonify({'error': 'Internship not found'}), 404
        
        # Create application
        application = Application(
            applicant_name=data['applicant_name'],
            email=data['email'],
            university=data['university'],
            major=data['major'],
            gpa=data.get('gpa'),
            cover_letter=data.get('cover_letter'),
            internship_id=data['internship_id']
        )
        
        # AI Processing
        skills = extract_skills(application.cover_letter or "")
        application.ai_score = calculate_ai_score(application)
        application.ai_summary = generate_ai_summary(application, skills)
        application.skills_extracted = skills
        
        db.session.add(application)
        db.session.commit()
        
        return jsonify({
            'message': 'Application submitted successfully',
            'application': application.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e), 'message': 'Failed to create application'}), 500