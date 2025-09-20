from app import create_app
from app.models import db, Internship, Application

app = create_app()

def add_sample_data():
    
    with app.app_context():
        
        if Internship.query.count() == 0:
            sample_internships = [
                Internship(
                    title="Data Science Intern",
                    department="Technology",
                    description="Work on machine learning projects for government data analysis. Gain experience with Python, SQL, and data visualization tools.",
                    requirements="Python programming, SQL databases, Data analysis, Machine learning basics",
                    location="Washington, DC",
                    duration="3 months",
                    stipend=5000,
                    status="open",
                    required_skills=["python", "machine learning", "data analysis", "sql", "pandas"]
                ),
                Internship(
                    title="Policy Research Intern",
                    department="Research",
                    description="Assist in policy analysis and research projects. Work with senior researchers to analyze legislation and prepare reports.",
                    requirements="Research skills, Academic writing, Data analysis, Policy knowledge",
                    location="Remote",
                    duration="2 months",
                    stipend=3000,
                    status="open",
                    required_skills=["research", "writing", "analysis", "policy", "reports"]
                ),
                Internship(
                    title="Software Development Intern",
                    department="Technology",
                    description="Develop and maintain government web applications using modern technologies like React and Node.js.",
                    requirements="JavaScript, React, Node.js, HTML/CSS, Git",
                    location="Remote",
                    duration="3 months",
                    stipend=4500,
                    status="open",
                    required_skills=["javascript", "react", "node.js", "html", "css"]
                )
            ]
            db.session.add_all(sample_internships)
            db.session.commit()
            print(" Sample internships created")

        # Create sample applications if none exist
        if Application.query.count() == 0:
            internships = Internship.query.all()
            if internships:
                sample_applications = [
                    Application(
                        applicant_name="John Smith",
                        email="john.smith@university.edu",
                        university="Stanford University",
                        major="Computer Science",
                        gpa=8.8,
                        cover_letter="I have extensive experience with Python and machine learning through university projects and internships. I'm passionate about using data science for public good.",
                        internship_id=internships[0].id,
                        ai_score=85,
                        ai_summary="Strong candidate with excellent Python skills and machine learning experience. Top-tier university background.",
                        skills_extracted=["python", "machine learning", "data analysis", "sql"],
                        status="under_review"
                    ),
                    Application(
                        applicant_name="Sarah Johnson",
                        email="sarah.j@university.edu", 
                        university="Harvard University",
                        major="Political Science",
                        gpa=8.9,
                        cover_letter="I have conducted extensive policy research and published papers on government efficiency. Looking to apply my skills in a practical setting.",
                        internship_id=internships[1].id,
                        ai_score=92,
                        ai_summary="Excellent research background with strong writing skills. Ideal for policy research role.",
                        skills_extracted=["research", "writing", "policy analysis", "reports"],
                        status="pending"
                    )
                ]
                db.session.add_all(sample_applications)
                db.session.commit()
                print(" Sample applications created")

if __name__ == '__main__':
    with app.app_context():
        print(" Creating database tables...")
        db.create_all()
        print(" Database tables created")
        
        print(" Adding sample data...")
        add_sample_data()
        print(" Sample data added")
    
    print("\n GovConnect Backend Server Starting...")
    print(f" Frontend URL: {app.config['FRONTEND_URL']}")
    print(f" API Base URL: http://localhost:5000/api")
    print(f" Database: {app.config['SQLALCHEMY_DATABASE_URI'].split('://')[0]}")
    
    print("\n Available Endpoints:")
    print("   GET  /api/health - Health check")
    print("   GET  /api/internships - List internships")
    print("   POST /api/internships - Create internship") 
    print("   GET  /api/applications - List applications")
    print("   POST /api/applications - Create application")
    print("   GET  /api/ai/match-candidates/<id> - AI candidate matching")
    print("   GET  /api/dashboard/stats - Dashboard statistics")
    print("   POST /api/ai/analyze-sentiment - Sentiment analysis")
    
    print("\n Starting server...")
    app.run(
        host='0.0.0.0', 
        port=5000, 
        debug=app.config['DEBUG']
    )