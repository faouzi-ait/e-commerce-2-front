import * as cons from './constants';

export const getDefaultUrl = (payload) => {
  return { type: cons.DEFAULT_URL, payload };
};

export const getFilteredUrl = (payload) => {
  return { type: cons.FILTER_URL, payload };
};

export const getQuery = (payload) => {
  return { type: cons.QUERY, payload };
};

export const getRating = (payload) => {
  return { type: cons.RATING, payload };
};

export const getBrand = (payload) => {
  return { type: cons.BRAND, payload };
};

export const getLimit = (payload) => {
  return { type: cons.LIMIT, payload };
};

export const getPage = (payload) => {
  return { type: cons.PAGE, payload };
};

export const getPrice = (payload) => {
  return { type: cons.PRICING, payload };
};
