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
};

export type ToolCategory = {
  id: number;
  description: string;
  category: string;
  maintenanceInterval: MaintenanceInterval;
};

export type MaintenanceInterval = {
  id: number;
};

export type Education = {
  id: number;
  description: string;
  name: string;
}