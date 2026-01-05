export interface KayanConfig {
    baseURL: string;
}

export interface RegistrationRequest {
    traits: Record<string, any>;
    password: string;
    method?: string; // defaults to "password"
}

export interface LoginInitiateRequest {
    method: string;
    identifier: string;
}

export interface LoginRequest {
    identifier: string;
    password: string;
    method?: string; // defaults to "password"
}

export interface MFAVerifyRequest {
    identifier: string;
    code: string;
}

export interface RecoveryInitiateRequest {
    identifier: string;
}

export interface RecoveryResetRequest {
    token: string;
    password: string;
}

export interface VerificationVerifyRequest {
    token: string;
}

// Common response for login/registration/mfa success
export interface AuthResponse {
    identity: any;
    session: any;
    token: string;
}

export interface WhoAmIResponse {
    status: string;
    session: any;
}
