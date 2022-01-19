import * as cartStyles from '../components/pages/cart/styles.module.scss';
import * as cmpStyles from '../components/pages/login/styles.module.scss';

export const defaultUrl = (page = 1, limit = 5) =>
  `page=${page}&limit=${limit}`;

export const filteredCategoryUrl = (id, page = 1, limit = 3) =>
  `category=${id}&page=${page}&limit=${limit}`;

export const filteredSearchUrl = (term, page = 1, limit = 3) =>
  `${term}&page=${page}&limit=${limit}`;

export const filteredMenuList = (category) => {
  const menuListFiltered = category?.items?.map((label) => {
    return {
      value: label._id,
      label: label.name,
      url: label.url,
    };
  });
  return menuListFiltered;
};

export const submenufilteredMenuList = (category) => {
  const submenuFiltered = category?.items
    ?.filter((item) => item?.showOnNav === true)
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

export const paymentSelectStyles = {
  control: (base) => ({
    ...base,
    height: 37.05,
    color: '#000 !important',
    borderTopLeftRadius: '3px !important',
    borderTopRightRadius: '3px !important',
    borderBottomLeftRadius: '3px !important',
    borderBottomRightRadius: '3px !important',
    border: '1px solid #808080 !important',
    background: 'rgb(243, 243, 243)',
    boxShadow: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? 'bold' : 'normal',
    fontSize: '1.3rem',
    border: 0,
    color: '#000 !important',
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: '#000 !important',
    color: '#000 !important',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: '#000',
    },
  }),
};

export const selectStyles = {
  control: (base) => ({
    ...base,
    width: '15rem',
    height: 37.05,
    marginRight: '-.1rem',
    color: '#000 !important',
    borderTopLeftRadius: '5px !important',
    borderBottomLeftRadius: '5px !important',
    borderRight: '1px solid #A9A9A9 !important',
    background: 'rgb(243, 243, 243)',
    boxShadow: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? 'bold' : 'normal',
    fontSize: '1.3rem',
    border: 0,
    color: '#000 !important',
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: '#000 !important',
    color: '#000 !important',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: '#000',
    },
  }),
};

export const limitSelectOptions = [
  { value: 1, label: '1' },
  { value: 3, label: '3' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
];

export const limitSelectStyles = {
  control: (base) => ({
    ...base,
    width: '10vw',
    height: 37.05,
    boxShadow: 'none',
    border: '1px solid #cecece !important',
  }),
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? 'bold' : 'normal',
    fontSize: '1.3rem',
    color: '#000',
  }),
};

export const inputStyles = (styles = '') => `${cmpStyles.inputField} ${styles}`;
export const btnStyles = () =>
  `${cmpStyles.signinBtn} ${cartStyles.checkoutBtnWidth} ${cartStyles.checkoutBtnCheckout}`;
