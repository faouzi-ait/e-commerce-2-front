export const defaultUrl = (page = 1, limit = 4, query = '') =>
  `page=${page}&limit=${limit}${query}`;

export const filteredCategoryUrl = (id, page = 1, limit = 7, query = '') =>
  `category=${id}&page=${page}&limit=${limit}${query}`;

export const queryUrl = (filter, page = 1, limit = 10, query = '') =>
  `${filter}&page=${page}&limit=${limit}${query}`;
