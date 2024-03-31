import { TResponseFromDB } from 'src/models/interfaces';
import { TActionDb, TEntity } from 'src/models/types';

export async function errorHandler<T>({
  action,
  entity,
  callback,
}: {
  action: TActionDb;
  entity: TEntity;
  callback: () => Promise<T>;
}): Promise<TResponseFromDB<T>> {
  try {
    const result = await callback();
    return {
      data: result,
      error: null,
      success: true,
      message: `Successfully ${action} ${entity}`,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error,
      success: false,
      message: `Something is wrong when trying to do: ${action} ${entity}`,
    };
  }
}
