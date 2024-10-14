// import { AuthProvider } from 'react-admin';

type AuthProvider = {
    login: (params: { username: string, password: string }) => Promise<void>;
    checkError: (error: any) => Promise<void>;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
    getIdentity: () => Promise<{ id: string, fullName: string, email: string }>;
    getPermissions: () => Promise<string>;
    register: (params: { name: string, surname: string, email: string, password: string }) => Promise<void>;
};



const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        const response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
            const data = await response.json();
            if (data.msg === 'User not found') {
                throw new Error('Usuario no encontrado');
            }else if (data.msg === 'Invalid Password') {
                throw new Error('Contraseña incorrecta');
            } else if (data.msg === 'User not confirmed') {
                throw new Error('Usuario no confirmado');
            } else{
                throw new Error(response.statusText);
            }
        }

        const { token, role, id, name, surname, email } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('identity', JSON.stringify({ id: id, email: email, fullName: name + ' ' + surname }));
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
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('identity');
        return Promise.resolve();
    },
    getIdentity: () => {
        try {
            const { id, fullName, email } = JSON.parse(localStorage.getItem('identity') || '{}');
            return Promise.resolve({ id, fullName, email });
        } catch (error) {
            return Promise.reject();
        }
    },
    getPermissions: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return Promise.reject();
        }
        try {
            const request = new Request(`${import.meta.env.VITE_API_URL}/api/auth/permissions`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }),
            });

            const response = await fetch(request);
            if (response.status < 200 || response.status >= 300) {
                throw new Error('Failed to fetch permissions');
            }

            const { role } = await response.json();
            
            if (role === 'admin') {
                return Promise.resolve('admin');
            } else if (role === 'donor') {
                return Promise.resolve('donor');
            }
        } catch (error) {
            return Promise.reject('No permissions found');
        }
        return Promise.reject();
    },
    register: async ({ name, surname, email, password }) => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            method: 'POST',
            body: JSON.stringify({ name, surname, email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        const response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }
    }
};

export default authProvider;
