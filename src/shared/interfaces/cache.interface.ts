export interface ICache {
  set(key: string, value: string): void;
  clear(key: string): Promise<void>;
}
