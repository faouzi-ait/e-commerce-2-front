import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './actions';

import SwitchLayout from './LayoutSwitch';
import Row from '../../ui/ProductDisplay/row';
import Card from '../../ui/ProductDisplay/card';
import SideBar from '../../ui/ProductDisplay/sidebar';
import Pagination from '../../ui/ProductDisplay/pagination';
import { filteredCategoryUrl, defaultUrl /* queryUrl */ } from '../../../utils';
import {
  getDefaultUrl,
  /* getFilteredUrl */
} from '../../ui/ProductDisplay/pagination/actions';

import { loader } from './styles.module.scss';

function Submenu() {
  const dispatch = useDispatch();
  const { products, isRow, category, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    const { id } = category || {};

    if (id === 0) {
      dispatch(getProducts(defaultUrl()));
      dispatch(getDefaultUrl(getProducts(defaultUrl()).payload));
    } else {
      dispatch(getProducts(filteredCategoryUrl(id)));
      dispatch(getDefaultUrl(getProducts(filteredCategoryUrl(id)).payload));
    }
  }, [category, dispatch]);

  const productLayout = (row) =>
    row ? (
      <Row products={products} category={category} />
    ) : (
      <Card products={products} category={category} />
    );

  return (
    <>
      {category && (
        <div>
          <SwitchLayout />
          <div style={{ display: 'grid', gridTemplateColumns: '25% 75%' }}>
            <SideBar />
            <div>
              {loading ? (
                <div className={loader}>
                  <img src="/images/loading-page.gif" alt="load" />
                </div>
              ) : (
                productLayout(isRow)
              )}
              {!loading && <Pagination />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Submenu;
