import { v4 as uuid } from 'uuid';
import { IBoardList } from './../types/boards';

export class List implements IBoardList {
  id = uuid();
  title = '';
  creatorId = '';
  tasks = [];
  createdDate = new Date().toString();
  description = '';

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
