'use client';
import React from 'react';
import Card from '../dashboard/Card';
import InputBox from '../layout/InputBox';
import { Building2, MapPinCheck, Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { InternshipType } from '@/types';
import Button from '../layout/Button';
import { DatePicker } from './DatePicker';

export default function InternshipForm() {
    // const [applicationDeadline, setApplicationDeadline] = React.useState<Date | null>(null);
    // const [startDate, setStartDate] = React.useState<Date | null>(null);

    const [requiredSkills, setRequiredSkills] = React.useState<string[]>([]);
    const [preferredSkills, setPreferredSkills] = React.useState<string[]>([]);

    const [requiredSkill, setRequiredSkill] = React.useState<string>('');
    const [preferredSkill, setPreferredSkill] = React.useState<string>('');

    const addSkill = (skill: string , type: 'required' | 'preferred') => {
      if(type === 'required'){
        if(!requiredSkills.includes(skill) ){
          setRequiredSkills([...requiredSkills, skill]);
          setRequiredSkill('');
        }
      }else{
        if(!preferredSkills.includes(skill)){
          setPreferredSkills([...preferredSkills, skill]);
          setPreferredSkill('');
        }
      }
    };

    const removeSkill = (skill: string, type: 'required' | 'preferred') => {
      if(type === 'required'){
        setRequiredSkills(requiredSkills.filter(s => s !== skill));
      }else{
        setPreferredSkills(preferredSkills.filter(s => s !== skill));
      }
    };

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<InternshipType>();

  const onSubmit = async (data: InternshipType) => {};

  return (
    <form className="flex flex-col gap-4 md:gap-6">
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
                {...register('title', { required: 'Rquired.' })}
              />
            </InputBox>

            <InputBox label="Department *" error={errors.department}>
              <input
                type="text"
                className="w-full text-sm placeholder:text-sm"
                placeholder="e.g., Ministry of Technology"
                {...register('department', { required: 'Required.' })}
              />
            </InputBox>
          </div>

          <InputBox label="Description *" error={errors.description}>
            <textarea
              rows={4}
              className="w-full text-sm placeholder:text-sm"
              placeholder="Detailed description of the internship role and responsibilities."
              {...register('description', { required: "Required." })}
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
                {...register('location', { required: 'Required.' })}
              />
            </InputBox>

            <InputBox label="Duration *" error={errors.duration}>
              <input
                type="text"
                className="w-full text-sm placeholder:text-sm"
                placeholder="e.g., 3 months"
                {...register('duration', { required: 'Required.' })}
              />
            </InputBox>

            <InputBox label="Monthly Stipend (₹) *" error={errors.stipend}>
              <input
                type="text"
                className="w-full text-sm placeholder:text-sm"
                placeholder="e.g., 25000"
                {...register('stipend', { required: 'Required.' })}
              />
            </InputBox>
          </div>

           <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 ">
            <InputBox label="Application Deadline *" error={errors.applicationDeadline} padding="!p-0">
              <DatePicker />
            </InputBox>

            <InputBox label="Start Date *" error={errors.startDate} padding="!p-0">
              <DatePicker />
            </InputBox>
         </div>
        </div>

        
      </Card>

       <Card>
        <header className="flex items-center gap-2">
          <div>
            <Building2 className="text-blue-500" size={24} />
          </div>
          <div className="text-lg font-medium">
            <h4>Skills & Requirements</h4>
          </div>
        </header>

        <div className="mt-4 space-y-4">
          
            <div>
          <InputBox label="Required Skills *" error={errors.requiredSkills}>
            <input
              type="text"
              className="w-full text-sm placeholder:text-sm"
              placeholder="Required Skills"
              value={requiredSkill}
              onChange={(e) => setRequiredSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill(requiredSkill, 'required')}
            />
            <button type="button" className='p-2 cursor-pointer bg-stone-200 hover:bg-stone-300 transition duration-300 rounded-md'  onClick={() => addSkill(requiredSkill, 'required')} >
              <Plus size={16} />
            </button>
          </InputBox>

          <div className='flex items-center gap-2 flex-wrap mt-3'>{requiredSkills.map((skill, index) => (
            <span key={index} className='bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-2'>
              {skill} <X size={12} className='cursor-pointer' onClick={() => removeSkill(skill, 'required')} />
            </span>
          ))}</div>
          </div>
        </div>

        <div className='mt-4'>
          <InputBox label="Preferred Skills *" error={errors.preferredSkills}>
            <input
              type="text"
              className="w-full text-sm placeholder:text-sm"
              placeholder="Preferred Skills"
              value={preferredSkill}
              onChange={(e) => setPreferredSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill(preferredSkill, 'preferred')}
            />
            <button type="button" className='p-2 cursor-pointer bg-stone-200 hover:bg-stone-300 transition duration-300 rounded-md'  onClick={() => addSkill(preferredSkill, 'preferred')} >
              <Plus size={16} />
            </button>
          </InputBox>

          <div className='flex items-center gap-2 flex-wrap mt-3'>{preferredSkills.map((skill, index) => (
            <span key={index} className='bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-2'>
              {skill} <X size={12} className='cursor-pointer' onClick={() => removeSkill(skill, 'preferred')} />
            </span>
          ))}</div>
          </div>
      </Card>

      <div>
        <Button type="button" variant="primary" onClick={handleSubmit(onSubmit)}>
          Create Internship
        </Button>
      </div>
    </form>
  );
}
