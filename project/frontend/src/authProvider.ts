interface LoginParams {
    username: string;
    password: string;
}

interface AuthProvider {
    login: (params: LoginParams) => Promise<void>;
    logout: () => Promise<void>;
    checkError: (error: { status: number }) => Promise<void | never>;
    checkAuth: () => Promise<void | never>;
    getPermissions: () => Promise<any>;
}

const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        const response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }

        const { token } = await response.json();
        localStorage.setItem('token', token);
    },
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
};

export default authProvider;
