import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Sample skills database
TECH_SKILLS = ["python", "java", "javascript", "sql", "html", "css", "react", 
               "node.js", "data analysis", "machine learning", "excel", "word"]

SOFT_SKILLS = ["communication", "teamwork", "leadership", "problem solving", 
               "time management", "creativity", "adaptability"]

def extract_skills(text):
    """Extract skills from text"""
    if not text:
        return []
    
    text = text.lower()
    found_skills = []
    
    # Check for technical skills
    for skill in TECH_SKILLS:
        if skill in text:
            found_skills.append(skill)
    
    # Check for soft skills
    for skill in SOFT_SKILLS:
        if skill in text:
            found_skills.append(skill)
    
    return list(set(found_skills))  # Remove duplicates

def calculate_ai_score(application, internship=None):
    """
    Calculate AI score for an application
    Simple heuristic-based scoring for prototype
    """
    score = 50  # Base score
    
    # Score based on cover letter length
    if application.cover_letter:
        word_count = len(application.cover_letter.split())
        if word_count > 200:
            score += 10
        elif word_count > 100:
            score += 5
    
    # Score based on skills mentioned
    skills = extract_skills(application.cover_letter or "")
    score += min(len(skills) * 5, 20)  # Max 20 points for skills
    
    # Score based on GPA if provided
    if application.gpa:
        try:
            gpa = float(application.gpa)
            if gpa >= 8.5:
                score += 15
            elif gpa >= 8.0:
                score += 8
        except ValueError:
            pass
    
    # Ensure score is between 0-100
    return max(0, min(100, score))

def generate_ai_summary(application, skills):
    """
    Generate AI summary for an application
    """
    summary_parts = []
    
    # Add skills summary
    if skills:
        summary_parts.append(f"Candidate demonstrates skills in {', '.join(skills[:3])}.")
    
    # Add education summary
    summary_parts.append(f"{application.major} major from {application.university}.")
    
    # Add cover letter assessment
    if application.cover_letter:
        word_count = len(application.cover_letter.split())
        if word_count > 200:
            summary_parts.append("Detailed cover letter shows strong interest.")
        elif word_count > 100:
            summary_parts.append("Cover letter provides good background.")
    
    return " ".join(summary_parts)