export interface HttpPort {
    get(url: string): Promise<any>;
}