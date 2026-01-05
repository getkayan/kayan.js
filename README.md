# kayan.js

Node.js TypeScript SDK for the Kayan authentication service.

## Installation

```bash
npm install
```

## Usage

```typescript
import { KayanClient } from './src';

const client = new KayanClient({
  baseURL: 'http://localhost:8080/api/v1',
});

// Register
await client.register({ email: 'user@example.com' }, 'password');

// Login
const { token } = await client.login('user@example.com', 'password');

// WhoAmI
const me = await client.whoami(token);
console.log(me);
```

## API Reference

### `KayanClient`

- `register(traits, secret, method?)`
- `login(identifier, secret, method?)`
- `loginMFA(identifier, code)`
- `loginInitiate(method, identifier)`
- `recoveryInitiate(identifier)`
- `recoveryReset(token, password)`
- `verify(token)`
- `whoami(token)`
