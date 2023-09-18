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
import { logout } from '../../pages/login/actions';

import { loginStatus } from '../../pages/login/selector';
import { catgoriesList } from '../toggles/selectors';
import { basketSelector } from './selectors';

import * as utils from '../../../utils';
import * as cmpStyle from './styles.module.scss';

function Header() {
  // const { isDark } = useSelector(selectedTheme);
  const history = useHistory();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubmenu, setFilteredSubmenu] = useState([]);

  const category = useSelector(catgoriesList);
  const { loggedIn } = useSelector(loginStatus);
  const basket = useSelector(basketSelector);

  useEffect(() => {
    const menuListFiltered = utils.filteredMenuList(category);
    const submenuFiltered = utils.submenufilteredMenuList(category);

    setMenuList(menuListFiltered);
    setFilteredSubmenu(submenuFiltered);
  }, [category]);

  const submitQuery = (e) => {
    e.preventDefault();
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

  const userModalStyle = {
    width: '155px',
    background: 'rgba(21, 25, 31, 8)',
    border: '3px solid #FFFFFF',
    position: 'absolute',
    top: 50,
    right: 100,
    zIndex: 99999,
    cursor: 'default',
  };

  const UserMenuModal = ({ show, setShow, style, children, ...rest }) => {
    if (!show) return null;

    return (
      <>
        <section className={cmpStyle.mask}></section>
        <section style={style} {...rest}>
          {children}
        </section>
      </>
    );
  };

  return (
    <>
      <header className={cmpStyle.topHeader}>
        <section className={cmpStyle.headerLayout}>
          <img
            alt=""
            role="button"
            tabIndex="0"
            src="/images/logo.png"
            className={cmpStyle.logo}
            aria-label="back to home page"
            onClick={() => utils.backToHomePage(history)}
          />
          <form style={{ margin: '0 auto' }}>
            <section className={cmpStyle.inputContainer}>
              <SelectWrapper
                options={menuList}
                styles={utils.selectStyles}
                className={cmpStyle.selectBox}
                aria-label="list of all departments"
                classNamePrefix="react-select"
                onChange={getSelectedCategoryProducts}
                defaultValue={{ label: 'Departments', value: 'Departments' }}
              />
              <input
                type="text"
                id="search"
                name="search"
                autoComplete="off"
                aria-label="search for products here"
                value={searchTerm}
                className={cmpStyle.search}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search our product catalogue"
              />
              <button
                type="submit"
                aria-label="click or press enter to start a search"
                className={cmpStyle.submit}
                onClick={submitQuery}>
                <i className="fa fa-search"></i>
              </button>
            </section>
          </form>

          <section className={cmpStyle.cartContainer}>
            {!loggedIn ? (
              <section
                className={cmpStyle.loginLink}
                aria-label="Login section">
                <a
                  tabIndex="0"
                  href="/login"
                  style={{ all: 'unset' }}
                  aria-label="Login link">
                  Login
                </a>
              </section>
            ) : (
              <>
                <section
                  className={cmpStyle.loginLink}
                  onMouseEnter={() => setShow(true)}>
                  <a
                    href="/"
                    tabIndex="0"
                    aria-label="open user menu"
                    className={cmpStyle.welcomeMenu}
                    onMouseEnter={() => setShow(true)}>
                    Welcome
                  </a>
                  <UserMenuModal
                    show={show}
                    setShow={setShow}
                    style={{ ...userModalStyle }}
                    onMouseLeave={() => setShow(false)}
                    aria-modal="true">
                    <ul className={`${cmpStyle.menuList}`}>
                      {window.location.pathname !== '/' && (
                        <li>
                          <a
                            href="/"
                            tabIndex="0"
                            target="_self"
                            aria-label="home page link">
                            Home
                          </a>
                        </li>
                      )}
                      <li>
                        <a
                          tabIndex="0"
                          target="_self"
                          href="/dashboard"
                          aria-label="dashboard page link">
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          tabIndex="0"
                          aria-label="logout link"
                          onClick={() => dispatch(logout())}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </UserMenuModal>
                </section>
              </>
            )}

            <i
              tabIndex="0"
              type="button"
              aria-label="Go to chopping cart page"
              className="fa fa-shopping-bag basket-margin-fix"
              onClick={() => history.push('/checkout')}>
              <span className={cmpStyle.cartCnt}>{basket.length}</span>
            </i>
          </section>
        </section>
        <section className={cmpStyle.toggleBtn}>
          <ToggleButtons />
        </section>
      </header>
      <nav className={cmpStyle.bottomHeader}>
        {(filteredSubmenu || []).map((item) => (
          <Link
            key={item.id}
            onClick={() => linkAction(item)}
            className={cmpStyle.submenu}
            to={() => utils.goToCategory(item.value, item.id)}>
            {item.value}
          </Link>
        ))}
        <section className={cmpStyle.logo2}>
          <span>Amazon Prime </span>
          <span>&nbsp;| 30 Days Free Trial</span>
        </section>
      </nav>
    </>
  );
}

export default Header;
