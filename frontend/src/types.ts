export type NavlinkType = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export type InternshipType = {
  id?: number;
  status: 'open' | 'closed';
  title: string;
  department: string;
  description: string;
  location: string;
  duration: string;
  stipend: string;
  applicationDeadline: Date ;
  startDate: Date;
  requiredSkills: string[];
  preferredSkills?: string[];
  applications?: number;

};

export type ApplicationType = {
  id: number;
  internshipId: number;
  position: string;
  fullName: string;
  email: string;
  phone: string;
  graduationDate: Date;
  university: string;
  degree: string;
  gpa:  number;
  coverLetter: string;
  status: 'pending' | 'under review' | 'accepted' | 'rejected';
  appliedAt: Date;
}