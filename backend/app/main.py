from flask import Flask
from flask_cors import CORS
from .config import Config
from .models import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    CORS(app, origins=[app.config['FRONTEND_URL']])
    
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
    
    return app

# Create the app instance
app = create_app()