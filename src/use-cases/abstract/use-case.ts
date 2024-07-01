export interface UseCase<Model> {
  execute(...args: unknown[]): Promise<Model>;
}
