export const defaultUrl = (page = 1, limit = 5) =>
  `page=${page}&limit=${limit}`;

export const filteredCategoryUrl = (id, page = 1, limit = 5) =>
  `category=${id}&page=${page}&limit=${limit}`;

export const filteredSearchUrl = (term, page = 1, limit = 5) =>
  `search=${term}&page=${page}&limit=${limit}`;

export const filteredMenuList = (category) => {
  const menuListFiltered = category.items.map((label) => {
    return {
      value: label._id,
      label: label.name,
      url: label.url,
    };
  });
  return menuListFiltered;
};

export const submenufilteredMenuList = (category) => {
  const submenuFiltered = category.items
    ?.filter((item) => item.showOnNav === true)
    ?.map((label) => {
      return {
        id: label._id,
        value: label.name,
        label: label.name,
        url: label.url,
      };
    });
  return submenuFiltered;
};

export const backToHomePage = (history) => {
  history.replace({
    search: '',
  });
  history.push('/');
};

export const goToCategory = (category, id) => ({
  pathname: `/category/${id}`,
  query: { id, category },
});

export const selectStyles = {
  control: (base) => ({
    ...base,
    width: '15rem',
    height: 37.05,
    marginRight: '-.1rem',
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? 'bold' : 'normal',
    fontSize: '1.3rem',
    border: 0,
  }),
};

export const limitSelectOptions = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
];

export const limitSelectStyles = {
  control: (base) => ({
    ...base,
    border: '1px solid #cecece !important',
    boxShadow: 'none',
    width: '10vw',
    height: 37.05,
  }),
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? 'bold' : 'normal',
    fontSize: '1.3rem',
  }),
};
