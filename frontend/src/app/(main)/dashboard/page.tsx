import Card from '@/components/dashboard/Card';
import PageHeading from '@/components/PageHeading';
import { Briefcase, CircleCheckBig, Clock, Users } from 'lucide-react';
import React from 'react';
import { dummyDashboardData, recentApplicantsDummyData } from '@/lib/DummyData';
import ApplicationStatusChart from '@/components/charts/ApplicationStatusChart';
import FeedbackSentimentPieChart from '@/components/charts/FeedbackSentimentChart';
import RecentApplicantItem from '@/components/dashboard/RecentApplicantItem';

export default function DashboardPage() {
  return (
    <section>
      <div className="container flex flex-col gap-4 md:gap-6">
        <PageHeading subText="Intelligent insights for government internship management">
          AI Powered Dashboard
        </PageHeading>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
          <Card className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Applications</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Users size={20} />
            </div>
          </Card>

          <Card className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Open Positions</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              <Briefcase size={20} />
            </div>
          </Card>

          <Card className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Under Review</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
              <Clock size={20} />
            </div>
          </Card>

          <Card className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Accepted</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <CircleCheckBig size={20} />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <Card className="flex h-100 flex-col gap-4">
            <h2 className="text-lg font-medium">Application Status Distribution</h2>
            <div className="flex flex-1 items-center justify-center rounded-md">
              <ApplicationStatusChart data={dummyDashboardData.statusDistribution} />
            </div>
          </Card>

          <Card className="flex h-100 flex-col gap-4">
            <h2 className="text-lg font-medium">Feedback Sentiment Analysis</h2>
            <div className="flex flex-1 items-center justify-center rounded-md">
              <FeedbackSentimentPieChart data={dummyDashboardData.sentimentAnalysis} />
            </div>
          </Card>
        </div>

        <div>
          <Card className="flex flex-col gap-4">
            <h2 className="text-lg font-medium">Recent Applications</h2>
            <div className="flex flex-1 flex-col justify-center gap-3 rounded-md">
              {recentApplicantsDummyData.map((applicant, index) => (
                <RecentApplicantItem key={index} applicant={applicant} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
