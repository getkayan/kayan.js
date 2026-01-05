import axios, { AxiosInstance } from 'axios';
import {
    KayanConfig,
    RegistrationRequest,
    LoginRequest,
    LoginInitiateRequest,
    MFAVerifyRequest,
    RecoveryInitiateRequest,
    RecoveryResetRequest,
    VerificationVerifyRequest,
    AuthResponse,
    WhoAmIResponse
} from './types';

export class KayanClient {
    private client: AxiosInstance;

    constructor(config: KayanConfig) {
        this.client = axios.create({
            baseURL: config.baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // --- Registration ---

    async register(traits: Record<string, any>, secret: string, method: string = 'password'): Promise<any> {
        const payload: RegistrationRequest = {
            traits,
            password: secret,
            method,
        };
        const response = await this.client.post('/registration', payload);
        return response.data;
    }

    // --- Login ---

    async login(identifier: string, secret: string, method: string = 'password'): Promise<AuthResponse> {
        const payload: LoginRequest = {
            identifier,
            password: secret,
            method,
        };
        const response = await this.client.post('/login', payload);
        return response.data;
    }

    // Handles MFA requirement response, which is HTTP 202 Accepted in kayan-echo
    // But standard login might just return it. 
    // In our simple client, we'll let the user handle the response structure or exceptions.

    async loginInitiate(method: string, identifier: string): Promise<any> {
        const payload: LoginInitiateRequest = {
            method,
            identifier,
        };
        const response = await this.client.post('/login/initiate', payload);
        return response.data;
    }

    async loginMFA(identifier: string, code: string): Promise<AuthResponse> {
        const payload: MFAVerifyRequest = {
            identifier,
            code,
        };
        const response = await this.client.post('/login/mfa', payload);
        return response.data;
    }

    // --- Recovery ---

    async recoveryInitiate(identifier: string): Promise<any> {
        const payload: RecoveryInitiateRequest = {
            identifier,
        };
        const response = await this.client.post('/recovery/initiate', payload);
        return response.data;
    }

    async recoveryReset(token: string, password: string): Promise<any> {
        const payload: RecoveryResetRequest = {
            token,
            password,
        };
        const response = await this.client.post('/recovery/reset', payload);
        return response.data;
    }

    // --- Verification ---

    async verify(token: string): Promise<any> {
        const payload: VerificationVerifyRequest = {
            token,
        };
        const response = await this.client.post('/verification/verify', payload);
        return response.data;
    }

    // --- Session Management ---

    async whoami(token: string): Promise<WhoAmIResponse> {
        const response = await this.client.get('/whoami', {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    }
}
