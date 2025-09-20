# app/routes/ai.py
from flask import Blueprint, request, jsonify
from app.mlmodels.sentiment_analysis import analyze_sentiment, extract_feedback_insights
from app.mlmodels.application_scoring import extract_skills, calculate_ai_score
from app.mlmodels.candidate_matching import find_best_candidates, get_candidate_recommendations, analyze_skill_gaps
from app.models import applications_db, feedback_db, internships_db

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/analyze-sentiment', methods=['POST'])
def analyze_sentiment_endpoint():
    try:
        data = request.get_json()
        
        if not data.get('text'):
            return jsonify({'error': 'Text is required'}), 400
        
        result = analyze_sentiment(data['text'])
        insights = extract_feedback_insights(data['text'])
        
        return jsonify({
            'sentiment': result,
            'insights': insights
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/analyze-application/<int:application_id>', methods=['POST'])
def analyze_application(application_id):
    try:
        application = next((app for app in applications_db if app.id == application_id), None)
        if not application:
            return jsonify({'error': 'Application not found'}), 404
        
        # Extract skills
        skills = extract_skills(application.cover_letter or "")
        
        # Calculate AI score
        ai_score = calculate_ai_score(application)
        
        # Generate summary
        from app.ml_models.application_scoring import generate_ai_summary
        ai_summary = generate_ai_summary(application, skills)
        
        # Update application
        application.skills_extracted = skills
        application.ai_score = ai_score
        application.ai_summary = ai_summary
        
        return jsonify({
            'application_id': application_id,
            'skills_extracted': skills,
            'ai_score': ai_score,
            'ai_summary': ai_summary
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/extract-skills', methods=['POST'])
def extract_skills_endpoint():
    try:
        data = request.get_json()
        
        if not data.get('text'):
            return jsonify({'error': 'Text is required'}), 400
        
        skills = extract_skills(data['text'])
        
        return jsonify({
            'skills': skills,
            'count': len(skills)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/match-candidates/<int:internship_id>', methods=['GET'])
def match_candidates_endpoint(internship_id):
    try:
        result = find_best_candidates(internship_id, applications_db, internships_db, top_n=5)
        
        if 'error' in result:
            return jsonify(result), 404
            
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/recommend-candidates/<int:internship_id>', methods=['GET'])
def recommend_candidates_endpoint(internship_id):
    try:
        internship = next((i for i in internships_db if i.id == internship_id), None)
        if not internship:
            return jsonify({'error': 'Internship not found'}), 404
        
        recommendations = get_candidate_recommendations(internship, applications_db)
        
        return jsonify({
            'internship_id': internship_id,
            'internship_title': internship.title,
            'recommendations': recommendations,
            'total_recommendations': len(recommendations)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/skill-gap-analysis/<int:internship_id>', methods=['GET'])
def skill_gap_analysis_endpoint(internship_id):
    try:
        internship = next((i for i in internships_db if i.id == internship_id), None)
        if not internship:
            return jsonify({'error': 'Internship not found'}), 404
        
        internship_applications = [app for app in applications_db if app.internship_id == internship_id]
        analysis = analyze_skill_gaps(internship, internship_applications)
        
        return jsonify({
            'internship_id': internship_id,
            'internship_title': internship.title,
            'analysis': analysis
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500