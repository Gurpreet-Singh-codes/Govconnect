'use client';
import React from 'react';
import Card from '../dashboard/Card';
import InputBox from '../layout/InputBox';
import { Building2, MapPinCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { InternshipType } from '@/types';
import Button from '../layout/Button';

export default function InternshipForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<InternshipType>();

  const onSubmit = async (data: InternshipType) => {};

  return (
    <form className="flex flex-col gap-4 md:gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <header className="flex items-center gap-2">
          <div>
            <Building2 className="text-blue-500" size={24} />
          </div>
          <div className="text-lg font-medium">
            <h4>Basic Information</h4>
          </div>
        </header>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
            <InputBox label="Internship Title *" error={errors.title}>
              <input
                type="text"
                className="w-full text-sm placeholder:text-sm"
                placeholder="e.g., Software Development Intern"
                {...register('title', { required: 'Title is required.' })}
              />
            </InputBox>

            <InputBox label="Department *" error={errors.department}>
              <input
                type="text"
                className="w-full text-sm placeholder:text-sm"
                placeholder="e.g., Ministry of Technology"
                {...register('department', { required: 'Department is required.' })}
              />
            </InputBox>
          </div>

          <InputBox label="Description *" error={errors.description}>
            <textarea
              rows={4}
              className="w-full text-sm placeholder:text-sm"
              placeholder="Detailed description of the internship role and responsibilities."
              {...register('description', { required: 'Description is required.' })}
            />
          </InputBox>
        </div>
      </Card>

      <Card>
        <header className="flex items-center gap-2">
          <div>
            <MapPinCheck className="text-purple-500" size={24} />
          </div>
          <div className="text-lg font-medium">
            <h4>Location & Duration</h4>
          </div>
        </header>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            <InputBox label="Location *" error={errors.location}>
              <input
                type="text"
                className="w-full text-sm placeholder:text-sm"
                placeholder="e.g., New Delhi"
                {...register('location', { required: 'Location is required.' })}
              />
            </InputBox>

            <InputBox label="Duration *" error={errors.duration}>
              <input
                type="text"
                className="w-full text-sm placeholder:text-sm"
                placeholder="e.g., 3 months"
                {...register('duration', { required: 'Duration is required.' })}
              />
            </InputBox>

            <InputBox label="Monthly Stipend (₹) *" error={errors.stipend}>
              <input
                type="text"
                className="w-full text-sm placeholder:text-sm"
                placeholder="e.g., 25000"
                {...register('stipend', { required: 'Stipend is required.' })}
              />
            </InputBox>
          </div>

          <InputBox label="Description *" error={errors.description}>
            <textarea
              rows={4}
              className="w-full text-sm placeholder:text-sm"
              placeholder="Detailed description of the internship role and responsibilities."
              {...register('description', { required: 'Description is required.' })}
            />
          </InputBox>
        </div>
      </Card>

      <div>
        <Button type="submit" variant="primary">
          Create Internship
        </Button>
      </div>
    </form>
  );
}
