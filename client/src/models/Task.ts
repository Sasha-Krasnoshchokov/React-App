import { v4 as uuid } from 'uuid';
import { IBoardTask } from '../types/boards';
import { ID, IHistory } from '../types/common';

export class Task implements IBoardTask {
  id = uuid();
  title = '';
  creatorId = '';
  createdDate = new Date().toString();
  description = '';
  listId = '' as ID;
  dueDate = '';
  assignedTo = '';
  status = '';
  priority = '';
  activities = [] as IHistory[];

  constructor({
    title,
    description,
    listId,
    status,
    dueDate,
    priority,
    activity,
  }: {
    title: string;
    description: string;
    listId: ID;
    status: string;
    dueDate: string;
    priority: string;
    activity: IHistory;
  }) {
    this.title = title;
    this.description = description;
    this.listId = listId;
    this.status = status;
    this.dueDate = dueDate;
    this.priority = priority;
    this.activities.push(activity);
  }
}
