import React from 'react';
import { RecentApplicantType } from '@/types';

interface RecentApplicantItemProps {
  applicant: RecentApplicantType;
}

const RecentApplicantItem: React.FC<RecentApplicantItemProps> = ({ applicant }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 p-2 transition-colors duration-200 hover:bg-gray-50">
      {/* Left side - Avatar and Info */}
      <div className="flex gap-3 text-left">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 uppercase">{applicant.fullName}</p>
          <p className="truncate text-xs text-gray-500">
            {applicant.university} • {applicant.degree}
          </p>
        </div>
      </div>

      {/* Right side - Status and Score */}
      <div className="flex flex-shrink-0 flex-col items-end gap-2">
        <span
          className={`flex items-center justify-center rounded-full px-1 py-1 text-xs font-medium ${getStatusColor(applicant.status)}`}
        >
          {applicant.status}
        </span>
        <span className="text-xs text-gray-500">AI Score: {applicant.aiScore}/100</span>
      </div>
    </div>
  );
};

export default RecentApplicantItem;
