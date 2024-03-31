import axios, { AxiosResponse } from 'axios';
import { ID, IHistory } from '../types/common';
import { IBoardTask, IBoardList } from '../types/boards';

const API = axios.create({
  baseURL: 'http://localhost:4000/',
});

export type TMethod = 'get' | 'post' | 'put' | 'delete';
type TBody = IBoardList | IBoardList[] | IBoardTask | IBoardTask[] | IHistory;
type TEntity = 'lists' | 'tasks' | 'taskMove' | 'activities';

interface IQuery {
  entity: TEntity;
  listId?: ID;
  taskId?: ID;
}

interface IUrlByEntity {
  listId?: ID;
  taskId?: ID;
}
const urlByEntity: Record<TEntity, (props: IUrlByEntity) => string> = {
  lists: ({ listId }: IUrlByEntity) => `lists${listId ? `/${listId}` : ''}`,
  tasks: ({ listId, taskId }: IUrlByEntity) =>
    `tasks${listId ? `/?listId=${listId}${taskId ? `&taskId=${taskId}` : ''}` : `${taskId ? `/${taskId}` : ''}`}`,
  taskMove: () => 'tasks/move',
  activities: () => 'activities',
};

interface IApiFactoryProps {
  method: TMethod;
  query: IQuery;
  body?: TBody;
}
const apiFactory = ({ method, query, body }: IApiFactoryProps): Promise<AxiosResponse<any, any>> | null => {
  const { entity, listId, taskId } = query;
  const url = urlByEntity[entity]({ listId, taskId });
  try {
    return API[method](url, body);
  } catch (e) {
    console.error('Request failed', e);
    return null;
  }
};

const requests: Record<TMethod, (props: any) => Promise<AxiosResponse<any, any>> | null> = {
  get: (query: IQuery) => apiFactory({ method: 'get', query }),
  post: ({ query, body }: { query: IQuery; body: TBody }) => apiFactory({ method: 'post', query, body }),
  put: ({ query, body }: { query: IQuery; body: TBody }) => apiFactory({ method: 'put', query, body }),
  delete: ({ query }: { query: IQuery }) => apiFactory({ method: 'delete', query }),
};

export default requests;
