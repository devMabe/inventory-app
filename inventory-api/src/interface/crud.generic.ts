export interface ICrudGeneric<T> {
  getAll: (userId?: number) => Promise<T[]>;
  getById: (id: number) => Promise<T>;
  create: (args?: T) => Promise<T>;
  update: (args: T) => Promise<T>;
  delete: (id: number) => Promise<boolean>;
}
