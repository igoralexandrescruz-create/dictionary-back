import { HttpPort } from "src/modules/_shared/application/ports/http.port";

export class FetchAdapter implements HttpPort {
    private static instance: FetchAdapter;

    private constructor() { }

    public static getInstance(): FetchAdapter {
        if (!this.instance) {
            this.instance = new FetchAdapter();
        }
        return this.instance;
    }

    async get(url: string): Promise<any> {
        const response = await fetch(url);
        return response.json();
    }
}