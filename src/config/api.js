const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = {
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login`,
    },

    USERS: {
        GET_ALL: `${BASE_URL}/users`,
        CREATE: `${BASE_URL}/users`,
        GET_BY_ID: (id) => `${BASE_URL}/users/${id}`,
        UPDATE: (id) => `${BASE_URL}/users/${id}`,
        DELETE: (id) => `${BASE_URL}/users/${id}`,
    },

    PRODUCTS: {
        GET_ALL: `${BASE_URL}/products`,
        CREATE: `${BASE_URL}/products`,
        GET_BY_ID: (id) => `${BASE_URL}/products/${id}`,
        UPDATE: (id) => `${BASE_URL}/products/${id}`,
        DELETE: (id) => `${BASE_URL}/products/${id}`,
    },

    CARTS: {
        GET_ALL: `${BASE_URL}/carts`,
        CREATE: `${BASE_URL}/carts`,
        GET_BY_ID: (id) => `${BASE_URL}/carts/${id}`,
        UPDATE: (id) => `${BASE_URL}/carts/${id}`,
        DELETE: (id) => `${BASE_URL}/carts/${id}`,
    },
};