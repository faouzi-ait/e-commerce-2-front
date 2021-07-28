import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './actions';

import SwitchLayout from './LayoutSwitch';
import Row from '../../ui/product_display/row';
import SideBar from '../../ui/product_display/sidebar';
import Pagination from '../../ui/product_display/pagination';
import PageLoader from '../../ui/page_loader';
import Footer from '../../ui/footer';
import { filteredCategoryUrl, defaultUrl /* queryUrl */ } from '../../../utils';
import {
  getDefaultUrl,
  /* getFilteredUrl */
} from '../../ui/product_display/pagination/actions';

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

  return (
    <>
      {category && (
        <div>
          <SwitchLayout />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '25% 75%',
              padding: '0 2rem 0 0',
            }}>
            <SideBar />
            <div>
              {loading ? (
                <PageLoader />
              ) : (
                <Row products={products} category={category} isRow={isRow} />
              )}
              {!loading && <Pagination />}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Submenu;
