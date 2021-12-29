import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ToggleButtons from '../toggles';
import SelectWrapper from '../../ui/select';
// import { THEMES } from '../../ui/toggles/constants';
// import { t } from '../../i18n/translate';

import { getDefaultUrl } from '../product_display/pagination/actions';
import { getCategory, getProducts } from '../../pages/product/actions';
import { getSearch, getSearchString } from './actions';

import { loginStatus } from '../../pages/login/selector';
import { catgoriesList } from '../toggles/selectors';

import * as utils from '../../../utils';
import * as cmpStyle from './styles.module.scss';

function Header() {
  // const { isDark } = useSelector(selectedTheme);
  const dispatch = useDispatch();
  const history = useHistory();
  const category = useSelector(catgoriesList);
  const [menuList, setMenuList] = useState([]);
  const { loggedIn } = useSelector(loginStatus);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubmenu, setFilteredSubmenu] = useState([]);

  useEffect(() => {
    const menuListFiltered = utils.filteredMenuList(category);
    const submenuFiltered = utils.submenufilteredMenuList(category);

    setMenuList(menuListFiltered);
    setFilteredSubmenu(submenuFiltered);
  }, [category]);

  const submitQuery = (e) => {
    if (!searchTerm) return false;

    dispatch(getSearchString(`${searchTerm}`));
    dispatch(getSearch(`search=${searchTerm}&page=1`));
    history.push('/search');
  };

  const linkAction = (item) => {
    dispatch(
      getDefaultUrl(getProducts(utils.filteredCategoryUrl(item.id)).payload)
    );
    dispatch(getProducts(utils.filteredCategoryUrl(item.id)));
    dispatch(getCategory(item));
  };

  const getSelectedCategoryProducts = (e) => {
    dispatch(getDefaultUrl(`category=${e.value}&page=1&limit=5`));
    dispatch(
      getCategory({ id: e.value, value: e.label, label: e.label, url: '' })
    );
    history.push(`/category/${e.value}`);
  };

  return (
    <>
      <div className={cmpStyle.topHeader}>
        <div className={cmpStyle.headerLayout}>
          <img
            alt="logo"
            src="/images/logo.png"
            className={cmpStyle.logo}
            onClick={() => utils.backToHomePage(history)}
          />
          <div className={cmpStyle.inputContainer}>
            <SelectWrapper
              options={menuList}
              styles={utils.selectStyles}
              className={cmpStyle.selectBox}
              classNamePrefix="react-select"
              onChange={getSelectedCategoryProducts}
              defaultValue={{ label: 'Departments', value: 'Departments' }}
            />
            <input
              type="text"
              id="search"
              name="search"
              autoComplete="off"
              value={searchTerm}
              className={cmpStyle.search}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className={cmpStyle.submit} onClick={submitQuery}>
              <i className="fa fa-search"></i>
            </div>
          </div>
          <div className={cmpStyle.cartContainer}>
            {!loggedIn && (
              <div
                className={cmpStyle.loginLink}
                onClick={() => history.push('/login')}>
                <span>Login</span>
              </div>
            )}
            <i className="fa fa-shopping-bag"></i>
          </div>
        </div>
        <span className={cmpStyle.toggleBtn}>
          <ToggleButtons />
        </span>
      </div>
      <div className={cmpStyle.bottomHeader}>
        {(filteredSubmenu || []).map((item) => (
          <Link
            key={item.id}
            onClick={() => linkAction(item)}
            className={cmpStyle.submenu}
            to={() => utils.goToCategory(item.value, item.id)}>
            {item.value}
          </Link>
        ))}
        <div className={cmpStyle.logo2}>
          <span>Amazon Prime </span>
          <span>&nbsp;| 30 Days Free Trial</span>
        </div>
      </div>
    </>
  );
}

export default Header;
