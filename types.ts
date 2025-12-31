
export enum Role {
  INSTITUTIONAL = 'Institutional Level (Universal QA)',
  MANAGER = 'Organisation Manager',
  ORGANISER = 'Course Organiser',
  EDUCATOR = 'Educator',
  FOUNDATION = 'Foundation'
}

export interface Question {
  id: string;
  text: string;
  hint: string;
  role: Role;
  section: string;
}

export interface AssessmentResponse {
  questionId: string;
  score: number;
  evidence: string;
  rootCause?: string;
  actionPlan?: string;
  responsibility?: string;
  timeline?: string;
}

export interface MaturityLevel {
  level: number;
  label: string;
  emoji: string;
  description: string;
}

export interface SectionScore {
  name: string;
  average: number;
  totalQuestions: number;
  gaps: number;
}
