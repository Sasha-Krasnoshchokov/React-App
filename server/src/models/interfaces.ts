export interface TResponseFromDB<T> {
  data: T;
  error: any;
  success: boolean;
  message: string;
}
