# app/routes/internships.py
from flask import Blueprint, request, jsonify
from app.models import internships_db, applications_db, Internship

internships_bp = Blueprint('internships', __name__)

@internships_bp.route('/', methods=['GET'])
def get_internships():
    status_filter = request.args.get('status', 'all')
    
    if status_filter == 'all':
        internships = internships_db
    else:
        internships = [i for i in internships_db if i.status == status_filter]
    
    # Add application count to each internship
    internships_with_counts = []
    for internship in internships:
        internship_data = internship.to_dict()
        internship_data['application_count'] = len(
            [app for app in applications_db if app.internship_id == internship.id]
        )
        internships_with_counts.append(internship_data)
    
    return jsonify({
        'internships': internships_with_counts,
        'total': len(internships_with_counts)
    })

@internships_bp.route('/', methods=['POST'])
def create_internship():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'department', 'description']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Create internship
        internship = Internship(
            title=data['title'],
            department=data['department'],
            description=data['description'],
            requirements=data.get('requirements'),
            location=data.get('location', 'Remote'),
            duration=data.get('duration', '3 months'),
            stipend=data.get('stipend'),
            status=data.get('status', 'draft'),
            required_skills=data.get('required_skills', [])
        )
        
        internships_db.append(internship)
        
        return jsonify({
            'message': 'Internship created successfully',
            'internship': internship.to_dict()
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@internships_bp.route('/<int:internship_id>', methods=['GET'])
def get_internship(internship_id):
    internship = next((i for i in internships_db if i.id == internship_id), None)
    if not internship:
        return jsonify({'error': 'Internship not found'}), 404
    
    # Add applications for this internship
    internship_data = internship.to_dict()
    internship_data['applications'] = [
        app.to_dict() for app in applications_db 
        if app.internship_id == internship_id
    ]
    
    return jsonify(internship_data)