// export const defaultUrl = (page = 1, limit = 6) => {
//   return `page=${page}&limit=${limit}`;
// };

export const defaultUrl = (page = 1, limit = 6) => {
  return `page=${page}&limit=${limit}`;
};

export const filteredCategoryUrl = (id, page = 1, limit = 8) =>
  `category=${id}&page=${page}&limit=${limit}`;

export const queryUrl = (filter, page = 1, limit = 10) =>
  `${filter}&page=${page}&limit=${limit}`;
