from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid
from typing import List, Dict, Any, Optional

db = SQLAlchemy()

class Internship(db.Model):
    __tablename__ = 'internships'
    
    id: str = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title: str = db.Column(db.String(100), nullable=False)
    department: str = db.Column(db.String(100), nullable=False)
    description: str = db.Column(db.Text, nullable=False)
    requirements: Optional[str] = db.Column(db.Text)
    location: str = db.Column(db.String(100), default='Remote')
    duration: str = db.Column(db.String(50), default='3 months')
    stipend: Optional[float] = db.Column(db.Float)
    status: str = db.Column(db.String(20), default='draft')
    required_skills: Optional[List[str]] = db.Column(db.JSON)
    created_at: datetime = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at: datetime = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    applications = db.relationship('Application', backref='internship', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            'id': self.id,
            'title': self.title,
            'department': self.department,
            'description': self.description,
            'requirements': self.requirements,
            'location': self.location,
            'duration': self.duration,
            'stipend': self.stipend,
            'status': self.status,
            'required_skills': self.required_skills or [],
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'application_count': len(self.applications)
        }

class Application(db.Model):
    __tablename__ = 'applications'
    
    id: str = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    applicant_name: str = db.Column(db.String(100), nullable=False)
    email: str = db.Column(db.String(100), nullable=False)
    university: str = db.Column(db.String(100), nullable=False)
    major: str = db.Column(db.String(100), nullable=False)
    gpa: Optional[float] = db.Column(db.Float)
    cover_letter: Optional[str] = db.Column(db.Text)
    status: str = db.Column(db.String(20), default='pending')
    ai_score: Optional[float] = db.Column(db.Float)
    ai_summary: Optional[str] = db.Column(db.Text)
    skills_extracted: Optional[List[str]] = db.Column(db.JSON)
    internship_id: Optional[str] = db.Column(db.String(36), db.ForeignKey('internships.id'))
    created_at: datetime = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at: datetime = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            'id': self.id,
            'applicant_name': self.applicant_name,
            'email': self.email,
            'university': self.university,
            'major': self.major,
            'gpa': self.gpa,
            'cover_letter': self.cover_letter,
            'status': self.status,
            'ai_score': self.ai_score,
            'ai_summary': self.ai_summary,
            'skills_extracted': self.skills_extracted or [],
            'internship_id': self.internship_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }