import { KayanClient } from './index';

async function main() {
    const client = new KayanClient({
        baseURL: 'http://localhost:8080/api/v1',
    });

    const email = `test-${Date.now()}@example.com`;
    const password = 'secret-password-123';

    console.log(`--- 1. Registering user: ${email} ---`);
    try {
        const reg = await client.register({ email: email }, password);
        console.log('Registration success:', reg);
    } catch (e: any) {
        console.error('Registration failed:', e.response?.data || e.message);
        return;
    }

    console.log(`\n--- 2. Logging in ---`);
    let token = '';
    try {
        const login = await client.login(email, password);
        console.log('Login success. Token:', login.token);
        token = login.token;
    } catch (e: any) {
        console.error('Login failed:', e.response?.data || e.message);
        return;
    }

    if (token) {
        console.log(`\n--- 3. WhoAmI Check ---`);
        try {
            const me = await client.whoami(token);
            console.log('WhoAmI success:', me);
        } catch (e: any) {
            console.error('WhoAmI failed:', e.response?.data || e.message);
        }
    }
}

main();
