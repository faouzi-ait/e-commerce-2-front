import axios from 'axios';
import ApiClient from './ApiClient';

const TOKEN =
  JSON.parse(localStorage.getItem('CURRENT_USER')) || 'NOT_LOGGED_IN';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL_PROD,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (TOKEN) {
      config.headers['Authorization'] = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    /* 
      DECODE TOKEN
      IF TOKEN EXPIRED
        DISPATCH USER LOGOUT ACTION
        DISPATCH SET_AUTH TO FALSE
        REDIRECT TO HOME PAGE
      ELSE
        ADD TOKEN TO AUTHORIZATION HEADER
        DISPATCH FECTH USER DETAILS
        DISPATCH SET_AUTH TO TRUE
    */
    return response;
  },
  (error) => Promise.reject(error)
);

const apiClient = new ApiClient(axiosInstance);

export async function login(payload) {
  try {
    return await apiClient.post('/users/login', payload);
  } catch (error) {
    return error;
  }
}

export async function register(payload) {
  try {
    return await apiClient.post('/users/signup', payload);
  } catch (error) {
    return { error };
  }
}

export async function resendActivationTokenCall({ payload }) {
  try {
    return await apiClient.post('/user/resend', payload);
  } catch (error) {
    return { error };
  }
}

export async function fetchCategories() {
  try {
    return await apiClient.get('/categories');
  } catch (error) {
    return { error };
  }
}

export async function fetchHomePageProducts() {
  try {
    return await apiClient.get('/home-page-products');
  } catch (error) {
    return { error };
  }
}

export async function fetchProducts(query, params) {
  try {
    return await apiClient.get(`/products?${query}`, params);
  } catch (error) {
    return { error };
  }
}

// export async function upload_picture(payload) {
//   try {
//     const response = await apiClient.post('/upload', payload);
//     return await response.data;
//   } catch (error) {
//     return { error };
//   }
// }

// export async function update_profile(payload) {
//   try {
//     const response = await apiClient.post('/profile', payload);
//     return await response.data;
//   } catch (error) {
//     return { error };
//   }
// }
