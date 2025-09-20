from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.routes.applications import applications_bp
from app.routes.internships import internships_bp
from app.routes.ai import ai_bp
from app.routes.dashboard import dashboard_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS for your frontend
    CORS(app, origins=[app.config['FRONTEND_URL']])
    
    # Register blueprints
    app.register_blueprint(applications_bp, url_prefix='/api/applications')
    app.register_blueprint(internships_bp, url_prefix='/api/internships')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
    
    return app