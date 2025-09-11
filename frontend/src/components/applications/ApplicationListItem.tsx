import React from 'react';
import { 
  User, 
  GraduationCap, 
  Clock, 
  TrendingUp,
  MessageSquare,
  Building2,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { ApplicationType } from '@/types';

interface ApplicationCardProps {
  application: ApplicationType;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const getStatusBadge = (status: 'pending' | 'under review' | 'accepted' | 'rejected') => {
    const statusConfig: Record<string, { color: string; icon: React.ReactElement }> = {
      'rejected': { 
        color: 'bg-red-100 text-red-800', 
        icon: <XCircle className="w-3 h-3" />
      },
      'accepted': { 
        color: 'bg-green-100 text-green-800', 
        icon: <CheckCircle className="w-3 h-3" />
      },
      'pending': { 
        color: 'bg-yellow-100 text-yellow-800', 
        icon: <Clock className="w-3 h-3" />
      },
      'under review': { 
        color: 'bg-blue-100 text-blue-800', 
        icon: <AlertTriangle className="w-3 h-3" />
      }
    };

    const config = statusConfig[status] || statusConfig['pending'];
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {status}
      </span>
    );
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `about ${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const generateSkillCategories = () => {
    const categories = ['Analytical Skills', 'Technical Proficiency', 'Communication Skills'];
    if (application.degree.toLowerCase().includes('computer') || 
        application.degree.toLowerCase().includes('engineering')) {
      categories.push('Problem Solving');
    }
    return categories;
  };

  const generateAIScore = () => {
    const baseScore = Math.floor(application.gpa * 10);
    const randomFactor = Math.floor(Math.random() * 20) - 10;
    return Math.min(100, Math.max(0, baseScore + randomFactor));
  };

  const skillCategories = generateSkillCategories();
  const aiScore = generateAIScore();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header with applicant info and status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 uppercase">
              {application.fullName}
            </h3>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <GraduationCap className="w-4 h-4" />
              <span>{application.university} • {application.degree}</span>
            </div>
            <div className="text-gray-600 text-sm mt-1">
              GPA: {application.gpa}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {getStatusBadge(application.status)}
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">
              AI Score: <span className={`font-semibold ${
                aiScore >= 80 ? 'text-green-600' : 
                aiScore >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {aiScore}/100
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Application time */}
      <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
        <Clock className="w-4 h-4" />
        <span>Applied {formatDate(application.appliedAt)}</span>
      </div>

      {/* Skills categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skillCategories.map((category, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
          >
            {category}
          </span>
        ))}
        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
          +1
        </span>
      </div>

      {/* Position applied for */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-600" />
          <div>
            <h4 className="text-xs font-medium text-blue-900">
              {application.position}
            </h4>
            <p className="text-xs text-blue-700">
              Ministry of IT
            </p>
          </div>
        </div>
      </div>

      {/* AI Analysis feedback */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4">
        <div className="flex items-start gap-2">
          <MessageSquare className="w-6 h-6 text-gray-600 mt-0.5" />
          <div>
            <p className="text-xs text-gray-700 italic">
              {application.fullName} shows potential as a candidate for the government internship, especially with a strong GPA indicating solid academic performance. However, the poor quality of the cover letter raises concerns. Further details on relevant skills and experiences are needed to improve the application.
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 cursor-pointer">
          <MessageSquare className="w-4 h-4" />
          AI Analyze
        </button>
        <div className="flex gap-2">
         
          {(application.status === 'pending' || application.status === 'under review') && (
            <>
              <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors cursor-pointer">
                Reject & Gen. Feedback
              </button>
              <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors cursor-pointer">
                Accept
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
