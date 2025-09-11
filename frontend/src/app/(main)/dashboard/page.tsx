import Card from '@/components/dashboard/Card';
import PageHeading from '@/components/PageHeading';
import { Briefcase, CircleCheckBig, Clock, Timer, Users } from 'lucide-react';
import React from 'react';

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
          <Card className="flex flex-col gap-4">
            <h2 className="text-lg font-medium">Application Trends</h2>
            <div className="flex flex-1 items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-4 text-gray-400">
              <Timer size={48} />
            </div>
          </Card>

          <Card className="flex flex-col gap-4">
            <h2 className="text-lg font-medium">Application Trends</h2>
            <div className="flex flex-1 items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-4 text-gray-400">
              <Timer size={48} />
            </div>
          </Card>
        </div>

        <div>
          <Card className="flex flex-col gap-4">
            <h2 className="text-lg font-medium">Application Trends</h2>
            <div className="flex flex-1 items-center justify-center rounded-md border border-gray-300 p-4 text-center text-gray-400">
              <h2>No data available</h2>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
