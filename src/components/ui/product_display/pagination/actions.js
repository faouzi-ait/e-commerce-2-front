import { DEFAULT_URL, FILTER_URL, QUERY, RATING, BRAND, LIMIT, PAGE, PRICING } from './constants';

export const getDefaultUrl = (payload) => {
  return { type: DEFAULT_URL, payload };
};

export const getFilteredUrl = (payload) => {
  return { type: FILTER_URL, payload };
};

export const getQuery = (payload) => {
  return { type: QUERY, payload };
};

export const getRating = (payload) => {
  return { type: RATING, payload };
};

export const getBrand = (payload) => {
  return { type: BRAND, payload };
};

export const getLimit = (payload) => {
  return { type: LIMIT, payload };
};

export const getPage = (payload) => {
  return { type: PAGE, payload };
};

export const getPrice = (payload) => {
  return { type: PRICING, payload };
};
