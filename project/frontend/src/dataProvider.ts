import { DataProvider, fetchUtils } from 'react-admin';

const apiUrl = `${import.meta.env.VITE_API_URL}/api`;
const httpClient = (url: {url: String}, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field || 'name', order || 'ASC']),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;

        // const response = await httpClient(url);
        const { headers, json } = await httpClient(url);
        // console.log(parseInt(headers.get('Content-Range')?.split('/').pop() || '0', 10));
        // console.log(response.headers.get('Content-Range'));
        return {
            data: json,
            total: parseInt(headers.get('Content-Range')?.split('/').pop() || '0', 10),
        };
    },

    getOne: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
        return {
            data: json,
        };
    },

    getMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
        const { json } = await httpClient(url);
        return {
            data: json,
        };
    },

    getManyReference: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
        const { headers, json } = await httpClient(url);
        return {
            data: json,
            total: parseInt(headers.get('content-range')?.split('/').pop() || '0', 10),
        };
    },

    update: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        });
        return { data: json };
    },

    updateMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        });
        return { data: json };
    },

    create: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        });
        return {
            data: { ...params.data, id: json.id },
        };
    },

    delete: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        });
        return { data: json };
    },

    deleteMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
        const { json } = await httpClient(url, {
            method: 'DELETE',
        });
        return { data: json };
    },
};

export default dataProvider;