export type User = {
  id?: number;
  password: string;
  userType?: string;
  username: string;
};

export type Tool = {
  id: number;
  description: string;
  identifier: string;
  name: string;
  toolCategory: any;
  location: string;
};

export type ToolCategory = {
  id: number;
  description: string;
  category: string;
  maintenanceInterval: string;
  maintenanceDescription: string;
  maintenanceEstimatedTime: number;
  parentCategory : any;
};

export type Education = {
  id: number;
  description: string;
  name: string;
};

export type RelEducationToolCategory = {
  id: number;
  education: Education;
  toolCategory: ToolCategory;
};

export type RelEducationUser = {
  id: number;
  education: Education;
  user: User;
};

export type Issue = {
  id: number;
  tool: Tool;
  responsibleUser: User;
  dateTime: string;
  estimatedTime: number;
  title: string;
  severity: string;
  type: string;
  status: string;
  description: string;
  issueLogs?: IssueLog[];
};

export type IssueLog = {
  id: number;
  issueId: number;
  description: number;
}