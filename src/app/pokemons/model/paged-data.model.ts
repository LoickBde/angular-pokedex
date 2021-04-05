export interface PagedData<T> {
  data: T[];
  limit: number;
  offset: number;
}
