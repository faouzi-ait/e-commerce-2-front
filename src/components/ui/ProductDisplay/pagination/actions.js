import { DEFAULT_URL, FILTER_URL, QUERY } from './constants';

export const getDefaultUrl = (payload) => {
  return { type: DEFAULT_URL, payload };
};

export const getFilteredUrl = (payload) => {
  return { type: FILTER_URL, payload };
};

export const getQuery = (payload) => {
  return { type: QUERY, payload };
};
