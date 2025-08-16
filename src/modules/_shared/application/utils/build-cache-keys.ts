export const buildCacheKeys = (key: string, params: Record<string, any>): string => {
    const paramsKeys = Object.keys(params).sort();
    return `${key}:${paramsKeys.map(key => `${key}=${params[key]}`).join(':')}`;
};