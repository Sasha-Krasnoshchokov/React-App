export type TPriority = 'low' | 'medium' | 'high' | 'highest' | '';
export type ID = string | number;
export type Action = 'create' | 'edit' | 'delete' | 'move' | 'addTask';
export type Entity = 'list' | 'task' | 'user' | null;

export interface IAction {
  title: string;
  iconUrl?: string;
  color?: string;
}

export interface IPriority {
  title: TPriority;
  color?: string;
}

export interface IHistory {
  id: ID;
  description: string;
  date: string;
  creatorId: ID;
}

export interface ISelectorOption {
  key: string | Action | TPriority;
  iconUrl: string;
  color: string;
  title: string;
}
