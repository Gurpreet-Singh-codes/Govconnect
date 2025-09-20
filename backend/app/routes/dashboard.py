# app/routes/dashboard.py
from flask import Blueprint, jsonify
from app.models import applications_db, internships_db, feedback_db
from app.mlmodels.sentiment_analysis import analyze_sentiment

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/stats', methods=['GET'])
def get_dashboard_stats():
    # Basic counts
    total_internships = len(internships_db)
    total_applications = len(applications_db)
    
    # Status distribution
    status_counts = {}
    for app in applications_db:
        status_counts[app.status] = status_counts.get(app.status, 0) + 1
    
    # Average AI score
    scored_applications = [app for app in applications_db if app.ai_score is not None]
    avg_ai_score = sum(app.ai_score for app in scored_applications) / len(scored_applications) if scored_applications else 0
    
    # Department stats
    department_stats = {}
    for internship in internships_db:
        dept = internship.department
        if dept not in department_stats:
            department_stats[dept] = {
                'internship_count': 0,
                'application_count': 0
            }
        department_stats[dept]['internship_count'] += 1
    
    # Count applications per department
    for app in applications_db:
        if app.internship_id:
            internship = next((i for i in internships_db if i.id == app.internship_id), None)
            if internship and internship.department in department_stats:
                department_stats[internship.department]['application_count'] += 1
    
    return jsonify({
        'total_internships': total_internships,
        'total_applications': total_applications,
        'status_distribution': status_counts,
        'avg_ai_score': round(avg_ai_score, 1),
        'department_stats': department_stats,
        'open_internships': len([i for i in internships_db if i.status == 'open']),
        'pending_applications': len([app for app in applications_db if app.status == 'pending'])
    })