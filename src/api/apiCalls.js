import axios from 'axios';
import jwt from 'jwt-decode';
import { store } from '../store';
import ApiClient from './ApiClient';

import * as actions from '../components/pages/login/actions';

const renewTokens = async (token) => {
  const response = await axios.post(
    `${process.env.REACT_APP_URL_PROD}/token/renewToken`,
    { token }
  );
  return response.data;
};

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_URL_DEV,
  baseURL: process.env.REACT_APP_URL_PROD,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

// CREATE ORIGIN LIST TO ATTACH THE TOKEN
axiosInstance.interceptors.request.use(
  async (req) => {
    const auth = store.getState().tokens.tokens;
    let date = new Date();

    if (auth.token) {
      if (jwt(auth.token).exp < date.getTime() / 1000) {
        const { token, refreshToken } = await renewTokens(auth.refreshToken);

        store.dispatch(actions.setTokens({ token, refreshToken }));
        req.headers['Authorization'] = `Bearer ${token}`;
      } else {
        req.headers['Authorization'] = `Bearer ${auth.token}`;
      }
    }
    return req;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
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

export async function fetchUserDetails({ payload }) {
  try {
    return await apiClient.get(`/user/${payload}`);
  } catch (error) {
    return error;
  }
}

export async function fetchUserOrders({ payload }) {
  try {
    return await apiClient.get(`/order/customer/${payload}`);
  } catch (error) {
    return error;
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

export async function fetchRelatedProducts(urlParams, queryParams) {
  try {
    return await apiClient.get(`/related/${urlParams}`, queryParams);
  } catch (error) {
    return { error };
  }
}

export async function forgotPassword(payload) {
  try {
    return await apiClient.post('/users/forgotPassword', payload);
  } catch (error) {
    return error;
  }
}

export async function resetPassword(token, payload) {
  try {
    return await apiClient.patch(`/users/resetPassword/${token}`, payload);
  } catch (error) {
    return error;
  }
}

export async function searchByTerms(term, params) {
  try {
    return await apiClient.get(`/products?${term}`, params);
  } catch (error) {
    return { error };
  }
}

export async function updateProfile(params) {
  try {
    const response = await apiClient.post(`/users/updateUser`, params);
    return await response.data;
  } catch (error) {
    return { error };
  }
}

// export async function upload_picture(payload) {
// export async function updateProfile(payload) {
//   try {
//     const response = await apiClient.post('/profile', payload);
//     return await response.data;
//   } catch (error) {
//     return { error };
//   }
// }
//   try {
//     const response = await apiClient.post('/upload', payload);
//     return await response.data;
//   } catch (error) {
//     return { error };
//   }
// }
