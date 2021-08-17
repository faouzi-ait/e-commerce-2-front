import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './actions';

import SwitchLayout from './LayoutSwitch';
import Row from '../../ui/product_display/row';
import SideBar from '../../ui/product_display/sidebar';
import Pagination from '../../ui/product_display/pagination';
import PageLoader from '../../ui/page_loader';
import Footer from '../../ui/footer';
import { filteredCategoryUrl, defaultUrl } from '../../../utils';
import { getDefaultUrl } from '../../ui/product_display/pagination/actions';

import { productGrid } from './styles.module.scss';

function Submenu() {
  const dispatch = useDispatch();
  const { products, isRow, category, loading } = useSelector(
    (state) => state.products
  );

  console.log(products.data.items);

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
          <div className={productGrid}>
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
