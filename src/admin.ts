import {
    Identity
} from './types';
import axios, { AxiosInstance } from 'axios';
import { KayanConfig } from './types';

export class KayanAdmin {
    private client: AxiosInstance;

    constructor(config: KayanConfig) {
        this.client = axios.create({
            baseURL: config.baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Add interceptor to inject auth token if provided externally? 
        // Or assume the user passes the token to each method?
        // Let's assume user passes token or we config it.
        // For admin, it's safer to pass token explicitly or use a setter.
    }

    async listUsers(token: string, page: number = 1, limit: number = 20): Promise<Identity[]> {
        const response = await this.client.get(`/admin/users?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    }

    async getUser(token: string, id: string): Promise<Identity> {
        const response = await this.client.get(`/admin/users/${id}`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    }

    async deleteUser(token: string, id: string): Promise<void> {
        await this.client.delete(`/admin/users/${id}`, {
            headers: {
                Authorization: token,
            },
        });
    }
}
