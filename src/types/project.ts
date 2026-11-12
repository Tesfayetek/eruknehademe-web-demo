export type ProjectCategory = 
  | 'Website Projects' 
  | 'Web Applications' 
  | 'Mobile Applications' 
  | 'UI/UX Designs';

export type ProjectStatus = 'Prototype' | 'In Development' | 'Completed';

export type PreviewType = 'internal' | 'iframe' | 'external';

export interface DemoCredential {
  role: string;
  username: string;
  pinOrPassword: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  category: ProjectCategory;
  thumbnail: string;
  screenshots: string[];
  techStack: string[];
  features: string[];
  previewType: PreviewType;
  previewUrl: string;
  projectStatus: ProjectStatus;
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  demoCredentials?: DemoCredential[];
  specifications?: Record<string, string>;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
