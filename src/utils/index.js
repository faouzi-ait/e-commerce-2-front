/* eslint-disable no-useless-escape */
import * as cartStyles from '../components/pages/cart/styles.module.scss';
import * as cmpStyles from '../components/pages/login/styles.module.scss';
import { t } from '../i18n/translate';
import { store } from '../store';

export const defaultUrl = (
  page = 1,
  limit = store.getState().search.limit || 5
) => `page=${page}&limit=${limit}`;

export const filteredCategoryUrl = (
  id,
  page = 1,
  limit = store.getState().search.limit || 5
) => `category=${id}&page=${page}&limit=${limit}`;

export const filteredSearchUrl = (term, page = 1, limit = 2) =>
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

export const middlefooterData = [
  {
    label: 'col1',
    children: [
      'Get to Know Us',
      'Career',
      'About Us',
      'UK Fairness Statement',
      'Sustainability',
    ],
  },
  {
    label: 'col2',
    children: [
      'Make Money with Us',
      'Sell on Amazon',
      'Sell on Amazon Business',
      'Sell on Amazon Handmade',
      'Associate Programme',
      'Fulfilment by Amazon',
      'Seller Fulfilled Prime',
      'Amazon Pay',
    ],
  },
  {
    label: 'col3',
    children: [
      'Amazon Payment Methods',
      'Amazon Platinum Mastercard',
      'Amazon Classic Mastercard',
      'Amazon Money Store',
      'Gift Cards',
      'Amazon Currency Converter',
      'Payment Methods Help',
      'Shop with Points',
      'Top Up Your Account',
      'Top Up Your Account in Store',
    ],
  },
  {
    label: 'col4',
    children: [
      'Let Us Help You',
      'COVID-19 and Amazon',
      'Track Packages or View Orders',
      'Delivery Rates & Policies',
      'Amazon Prime',
      'Returns & Replacements',
      'Recycling',
      'Manage Your Content and Devices',
    ],
  },
];

export const bottomCountryFooter = [
  'Australia',
  'Brazil',
  'Canada',
  'China',
  'France',
  'Germany',
  'India',
  'Italy',
  'Japan',
  'Mexico',
  'Netherlands',
  'Poland',
  'Singapore',
  'Spain',
  'Turkey',
  'United Arab Emirates',
];

export const termsConditions = [
  'Conditions of Use & Sale',
  'Privacy Notice',
  'Cookies Notice',
  'Interest-Based Ads Notice',
  '©1996-2021, Amazon.com, Inc. or its affiliates',
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

export const paginationStyle = (cmpStyle, isCurrent) =>
  `${cmpStyle.pageNumbers} ${isCurrent && cmpStyle.active}`;

export const buildFormDataObject = (values, data) => {
  for (const [key, value] of Object.entries(values)) {
    data.append(key, value);
  }
  return data;
};

export const activationLandingScreen = (search) => {
  const param = new URLSearchParams(search).get('status');

  switch (param) {
    case 'activated':
      return 'Your account has been activated';
    case 'expired':
      return 'Your activation token has expired, please renew your token and try again';
    case 'already_activated':
      return 'Your account is already active, please login to access your account';
    default:
      return '';
  }
};

export const calculateTotal = (cart) =>
  cart.reduce((acc, item) => acc + item.total, 0);

export const setErrorStyle = (name) => {
  return {
    borderColor: name ? 'red' : '',
    boxShadow: name ? '0 0 1.5px 1px red' : '',
  };
};

export const defaultValues = {
  email: '',
  password: '',
};

export const resetPasswordDefaultValues = {
  password: '',
  confirmPassword: '',
};

export const defaultRegisterValues = {
  name: '',
  surname: '',
  email: '',
  dob: '',
  password: '',
  image: '',
};

export const emailFormPattern = {
  required: t('emailError'),
  pattern: {
    value:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    message: t('emailFormatError'),
  },
};
