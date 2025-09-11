

import React from 'react';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users,
  Building2,
  Calendar
} from 'lucide-react';
import { InternshipType } from '@/types';

const InternshipCard = ({ internship }: { internship: InternshipType }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header with title and status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {internship.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">{internship.department}</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {internship.description}
          </p>
        </div>
        <div className="ml-4">
          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
            internship.status === 'open' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {internship.status}
          </span>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{internship.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{internship.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span className="text-sm">{internship.stipend}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-4 h-4" />
          <span className="text-sm">{internship.applications}</span>
        </div>
      </div>

      {/* Deadline */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-md">
          <Calendar className="w-4 h-4 text-orange-600" />
          <span className="text-xs text-orange-700 font-medium">
            Deadline: {internship.applicationDeadline.toLocaleDateString()} 
          </span>
        </div>
      </div>

      {/* Required Skills */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Required Skills:</p>
        <div className="flex flex-wrap gap-2">
          {internship.requiredSkills.map((skill: string, index: number) => (
            <span 
              key={index}
              className="inline-flex  px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
