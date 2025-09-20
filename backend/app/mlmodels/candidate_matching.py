import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
from collections import defaultdict

# Enhanced skills database with categories
SKILLS_DATABASE = {
    "technical": {
        "programming": ["python", "java", "javascript", "c++", "c#", "ruby", "php", "swift", "kotlin", "go", "rust"],
        "web_development": ["html", "css", "react", "angular", "vue", "node.js", "express", "django", "flask", "spring"],
        "data_science": ["python", "r", "sql", "pandas", "numpy", "tensorflow", "pytorch", "scikit-learn", "data analysis", "machine learning"],
        "databases": ["sql", "mysql", "postgresql", "mongodb", "redis", "oracle", "sqlite"],
        "devops": ["docker", "kubernetes", "aws", "azure", "gcp", "jenkins", "git", "ci/cd", "linux"],
        "mobile": ["android", "ios", "react native", "flutter", "mobile development"]
    },
    "soft_skills": {
        "communication": ["communication", "public speaking", "presentation", "writing", "email"],
        "teamwork": ["teamwork", "collaboration", "team player", "group projects"],
        "leadership": ["leadership", "management", "mentoring", "supervision", "delegation"],
        "problem_solving": ["problem solving", "critical thinking", "analytical skills", "troubleshooting"],
        "time_management": ["time management", "organization", "planning", "multitasking", "deadlines"],
        "creativity": ["creativity", "innovation", "design thinking", "brainstorming"]
    },
    "government_specific": {
        "policy": ["policy analysis", "legislative research", "government affairs", "public policy"],
        "compliance": ["compliance", "regulatory affairs", "legal", "governance"],
        "public_administration": ["public administration", "government operations", "civic engagement"],
        "research": ["research", "data collection", "surveys", "qualitative analysis", "quantitative analysis"]
    }
}

def extract_skills_with_categories(text):
    """
    Extract skills from text and categorize them
    """
    if not text or not isinstance(text, str):
        return {"technical": [], "soft_skills": [], "government_specific": []}
    
    text = text.lower()
    found_skills = defaultdict(list)
    
    # Check each category and skill type
    for category, skill_types in SKILLS_DATABASE.items():
        for skill_type, skills in skill_types.items():
            for skill in skills:
                if skill in text:
                    found_skills[category].append(skill)
    
    # Remove duplicates and return
    return {category: list(set(skills)) for category, skills in found_skills.items()}

def calculate_skill_match(application_skills, internship_required_skills):
    """
    Calculate skill matching score between application and internship requirements
    """
    if not internship_required_skills:
        return 0
    
    # Convert to sets for comparison
    app_skills_set = set(application_skills)
    required_skills_set = set(internship_required_skills)
    
    if not required_skills_set:
        return 0
    
    # Calculate Jaccard similarity
    intersection = app_skills_set.intersection(required_skills_set)
    union = app_skills_set.union(required_skills_set)
    
    if not union:
        return 0
    
    return len(intersection) / len(union) * 100

def calculate_experience_score(cover_letter):
    """
    Calculate experience score based on cover letter content
    """
    if not cover_letter:
        return 0
    
    text = cover_letter.lower()
    score = 0
    
    # Check for experience indicators
    experience_indicators = [
        r'\d+\+? years?', r'experienced', r'proficient', r'expert', 
        r'advanced', r'skilled', r'knowledgeable', r'familiar with'
    ]
    
    for pattern in experience_indicators:
        if re.search(pattern, text):
            score += 10
    
    # Check for project mentions
    project_indicators = ['project', 'built', 'developed', 'created', 'implemented']
    for indicator in project_indicators:
        if indicator in text:
            score += 5
    
    return min(score, 50)  # Cap at 50 points

def calculate_education_score(application, internship_requirements):
    """
    Calculate education matching score
    """
    score = 0
    text = (application.cover_letter or "").lower() + " " + (application.major or "").lower()
    
    # Check for relevant degree
    degree_keywords = {
        "computer": ["computer science", "cs", "software engineering", "it"],
        "data": ["data science", "statistics", "mathematics", "analytics"],
        "business": ["business", "economics", "finance", "management"],
        "policy": ["public policy", "political science", "government", "international relations"]
    }
    
    # Simple keyword matching for education relevance
    for field, keywords in degree_keywords.items():
        for keyword in keywords:
            if keyword in text:
                score += 15
                break
    
    # GPA bonus
    if application.gpa:
        try:
            gpa = float(application.gpa)
            if gpa >= 3.7:
                score += 20
            elif gpa >= 3.3:
                score += 10
            elif gpa >= 3.0:
                score += 5
        except ValueError:
            pass
    
    return min(score, 35)  # Cap at 35 points

def generate_match_reasoning(application, internship, match_score, skill_match, strengths):
    """
    Generate human-readable reasoning for the match
    """
    reasoning_parts = []
    
    # Add skills match reasoning
    if skill_match > 70:
        reasoning_parts.append("Excellent skills alignment with position requirements.")
    elif skill_match > 40:
        reasoning_parts.append("Good skills match with some relevant experience.")
    else:
        reasoning_parts.append("Limited direct skills match but shows potential.")
    
    # Add education reasoning
    reasoning_parts.append(f"{application.major} major from {application.university}.")
    
    # Add strengths
    if strengths:
        strength_list = ", ".join(strengths[:3])
        reasoning_parts.append(f"Demonstrates strengths in {strength_list}.")
    
    # Add cover letter assessment
    if application.cover_letter:
        word_count = len(application.cover_letter.split())
        if word_count > 250:
            reasoning_parts.append("Detailed cover letter shows strong interest and communication skills.")
        elif word_count > 100:
            reasoning_parts.append("Cover letter provides good background and motivation.")
    
    return " ".join(reasoning_parts)

def match_candidates_to_internship(internship, applications, top_n=5):
    """
    Match candidates to a specific internship position
    """
    if not applications:
        return []
    
    matched_candidates = []
    
    for application in applications:
        if application.internship_id != internship.id:
            continue
            
        # Extract skills with categories
        all_app_skills = []
        skills_by_category = extract_skills_with_categories(
            (application.cover_letter or "") + " " + (application.major or "")
        )
        
        for category_skills in skills_by_category.values():
            all_app_skills.extend(category_skills)
        
        # Calculate various scores
        skill_match_score = calculate_skill_match(all_app_skills, internship.required_skills)
        experience_score = calculate_experience_score(application.cover_letter)
        education_score = calculate_education_score(application, internship.requirements)
        ai_score = application.ai_score or 50  # Default if not calculated
        
        # Calculate overall match score (weighted average)
        overall_score = (
            skill_match_score * 0.4 +  # 40% skills match
            experience_score * 0.2 +   # 20% experience
            education_score * 0.2 +    # 20% education
            ai_score * 0.2             # 20% AI assessment
        )
        
        # Identify strengths
        strengths = []
        if skill_match_score > 60:
            strengths.append("technical skills alignment")
        if experience_score > 30:
            strengths.append("relevant experience")
        if education_score > 20:
            strengths.append("educational background")
        if ai_score > 70:
            strengths.append("strong overall application")
        
        # Generate reasoning
        reasoning = generate_match_reasoning(application, internship, overall_score, skill_match_score, strengths)
        
        matched_candidates.append({
            "application_id": application.id,
            "applicant_name": application.applicant_name,
            "email": application.email,
            "university": application.university,
            "major": application.major,
            "match_score": round(overall_score, 1),
            "skill_match": round(skill_match_score, 1),
            "experience_score": experience_score,
            "education_score": education_score,
            "ai_score": ai_score,
            "skills": all_app_skills,
            "strengths": strengths,
            "reasoning": reasoning,
            "status": application.status
        })
    
    # Sort by match score and return top N
    matched_candidates.sort(key=lambda x: x["match_score"], reverse=True)
    return matched_candidates[:top_n]

def find_best_candidates(internship_id, applications, all_internships, top_n=3):
    """
    Find best candidates for a specific internship from all applications
    """
    internship = next((i for i in all_internships if i.id == internship_id), None)
    if not internship:
        return {"error": "Internship not found"}
    
    # Filter applications for this internship
    internship_applications = [app for app in applications if app.internship_id == internship_id]
    
    if not internship_applications:
        return {"internship": internship.to_dict(), "matches": [], "message": "No applications found"}
    
    # Get matches
    matches = match_candidates_to_internship(internship, internship_applications, top_n)
    
    # Calculate statistics
    total_applications = len(internship_applications)
    avg_match_score = sum(match["match_score"] for match in matches) / len(matches) if matches else 0
    
    return {
        "internship": internship.to_dict(),
        "total_applications": total_applications,
        "avg_match_score": round(avg_match_score, 1),
        "top_matches": matches,
        "skill_gap_analysis": analyze_skill_gaps(internship, internship_applications)
    }

def analyze_skill_gaps(internship, applications):
    """
    Analyze skill gaps across all applications for an internship
    """
    if not internship.required_skills:
        return {"message": "No required skills specified"}
    
    required_skills = set(internship.required_skills)
    available_skills = set()
    
    for application in applications:
        skills = extract_skills_with_categories(
            (application.cover_letter or "") + " " + (application.major or "")
        )
        for category_skills in skills.values():
            available_skills.update(category_skills)
    
    # Find missing skills
    missing_skills = required_skills - available_skills
    strong_skills = available_skills.intersection(required_skills)
    
    return {
        "required_skills": list(required_skills),
        "available_skills": list(available_skills),
        "missing_skills": list(missing_skills),
        "strong_skills": list(strong_skills),
        "coverage_percentage": len(strong_skills) / len(required_skills) * 100 if required_skills else 0
    }

def get_candidate_recommendations(internship, all_applications, max_recommendations=5):
    """
    Get candidate recommendations for an internship based on skill matching
    """
    recommendations = []
    
    for application in all_applications:
        # Skip if already applied to this internship
        if application.internship_id == internship.id:
            continue
            
        # Calculate skill match
        all_app_skills = []
        skills_by_category = extract_skills_with_categories(
            (application.cover_letter or "") + " " + (application.major or "")
        )
        
        for category_skills in skills_by_category.values():
            all_app_skills.extend(category_skills)
        
        skill_match = calculate_skill_match(all_app_skills, internship.required_skills)
        
        if skill_match > 40:  # Only recommend if decent match
            recommendations.append({
                "application_id": application.id,
                "applicant_name": application.applicant_name,
                "current_internship_id": application.internship_id,
                "skill_match": round(skill_match, 1),
                "skills": all_app_skills,
                "ai_score": application.ai_score,
                "status": application.status
            })
    
    # Sort by skill match and return top recommendations
    recommendations.sort(key=lambda x: x["skill_match"], reverse=True)
    return recommendations[:max_recommendations]