export interface CachePort {
    get(key: string): Promise<string | null>;
    set(key: string, value: any, ttl?: number): Promise<boolean>;
    del(...keys: string[]): Promise<number>;
}
