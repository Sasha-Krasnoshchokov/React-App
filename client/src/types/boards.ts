import { IPriority, IHistory, ID } from './common';

export interface IBoardTask {
  id?: ID;
  listId?: ID;
  title: string;
  description: string;
  createdDate: string;
  dueDate: string;
  creatorId: ID;
  assignedTo?: string;
  status: string;
  priority: IPriority | string;
  activities: IHistory[];
}

export interface IBoardList {
  id?: ID;
  title?: string;
  creatorId?: ID;
  tasks?: IBoardTask[];
  createdDate?: string;
  description?: string;
}
