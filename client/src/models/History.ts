import { v4 as uuid } from 'uuid';
import { IHistory } from '../types/common';

export class History implements IHistory {
  id = uuid();
  description = '';
  date = new Date().toString().split(' ').slice(0, 5).join(' ');
  creatorId = '';

  constructor(description: string) {
    this.description = description;
  }
}
