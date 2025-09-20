from flask import Flask, jsonify
from flask_cors import CORS
from .config import Config
from .models import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS for your frontend
    CORS(app, origins=[app.config['FRONTEND_URL']])
    
    # Initialize database
    db.init_app(app)
    
    # Register blueprints
    from .routes.applications import applications_bp
    from .routes.internships import internships_bp
    from .routes.ai import ai_bp
    from .routes.dashboard import dashboard_bp
    
    app.register_blueprint(applications_bp, url_prefix='/api/applications')
    app.register_blueprint(internships_bp, url_prefix='/api/internships')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
    
    # Health check endpoint
    @app.route('/api/health')
    def health_check():
        return jsonify({
            'status': 'healthy',
            'message': 'GovConnect API is running',
            'database': 'connected'
        })
    
    @app.route('/')
    def home():
        return jsonify({
            'message': 'GovConnect Backend API',
            'version': '1.0.0',
            'endpoints': {
                'health': '/api/health',
                'internships': '/api/internships',
                'applications': '/api/applications',
                'ai': '/api/ai',
                'dashboard': '/api/dashboard/stats'
            }
        })
    
    return app