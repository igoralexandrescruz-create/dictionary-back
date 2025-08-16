export interface CachePort {
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: any, ttl?: number): Promise<boolean>;
    del(...keys: string[]): Promise<number>;
}
