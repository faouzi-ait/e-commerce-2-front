import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
// import { THEMES } from '../../ui/toggles/constants';
// import { t } from '../../i18n/translate';

import { catgoriesList } from '../../ui/toggles/selectors';
import { getCategory } from '../../pages/product/actions';
import ToggleButtons from '../toggles';

import {
  topHeader,
  bottomHeader,
  toggleBtn,
  logo,
  logo2,
  submenu,
  cartContainer,
  search,
  submit,
  selectBox,
} from './styles.module.scss';

function Header() {
  // const { isDark } = useSelector(selectedTheme);
  const dispatch = useDispatch();
  const history = useHistory();
  const [menuList, setMenuList] = useState([]);
  const [filteredSubmenu, setFilteredSubmenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const category = useSelector(catgoriesList);

  useEffect(() => {
    const menuListFiltered = category?.items?.map((label) => {
      return {
        value: label._id,
        label: label.name,
        url: label.url,
      };
    });

    const submenuFiltered = category?.items
      ?.filter((item) => item.showOnNav === true)
      ?.map((label) => {
        return {
          id: label._id,
          value: label.name,
          label: label.name,
          url: label.url,
        };
      });

    // submenuFiltered.unshift({
    //   id: 0,
    //   value: 'All',
    //   label: 'All',
    //   url: '',
    // });

    setMenuList(menuListFiltered);
    setFilteredSubmenu(submenuFiltered);
  }, [category]);

  const goToCategory = (category, id) => ({
    pathname: `/category/${id}`,
    query: { id, category },
  });

  const styles = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: 'none',
      width: '15rem',
      height: 37.05,
    }),
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isSelected ? 'bold' : 'normal',
      fontSize: '1.3rem',
    }),
  };

  const backToHomePage = () => {
    history.replace({
      search: '',
    });
    history.push('/');
  };

  const submitQuery = (e) => {
    if (selectedCategory === 'Departments' && !searchTerm) {
      return false;
    }

    history.push('/search');
    // DISPATCH THE SEARCH QUERY HERE
    // IF selectedCategory HAS A VALUE THEN DISPATCH THE SEARCH ACTION
    // IF THERE IS A SEARCH SEARCH TERM THEN USE IT INSTEAD
  };

  return (
    <>
      <div className={topHeader}>
        <div style={{ padding: '1rem', display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/logo.png"
            alt="logo"
            className={logo}
            onClick={() => backToHomePage()}
          />
          <div style={{ marginLeft: '12%', display: 'flex' }}>
            <Select
              options={menuList}
              styles={styles}
              className={selectBox}
              onChange={(e) => setSelectedCategory(e.value)}
              defaultValue={{ label: 'Departments', value: 'Departments' }}
            />
            <input
              type="text"
              name="search"
              id="search"
              className={search}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              autoComplete="off"
            />
            <div className={submit} onClick={submitQuery}>
              <i className="fa fa-search"></i>
            </div>
          </div>
          <div className={cartContainer}>
            <i className="fa fa-shopping-bag"></i>
          </div>
        </div>
        <span className={toggleBtn}>
          <ToggleButtons />
        </span>
      </div>
      <div className={bottomHeader}>
        {filteredSubmenu?.map((item) => (
          <Link
            key={item.id}
            className={submenu}
            to={goToCategory(item.value, item.id)}
            onClick={() => dispatch(getCategory(item))}>
            {item.value}
          </Link>
        ))}
        <div className={logo2}>
          <span>Amazon Prime </span>
          <span>&nbsp;| 30 Days Free Trial</span>
        </div>
      </div>
    </>
  );
}

export default Header;
