export type NavlinkType = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export type InternshipType = {
  title: string;
  department: string;
  description: string;
  location: string;
  duration: string;
  stipend: string;
  applicationDeadline: Date;
  startDate: Date;
  requiredSkills: string[];
  preferredSkills?: string[];
};
