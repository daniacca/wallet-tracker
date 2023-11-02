export default interface IWrite<T> {
  create(data: any): Promise<T>;
  update(id: string, data: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
