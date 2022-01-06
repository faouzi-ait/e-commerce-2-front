import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './actions';

import Pagination from '../../components/product_display/pagination';
import SideBar from '../../components/product_display/sidebar';
import Row from '../../components/product_display/row';
import SwitchLayout from '../../components/switch';
import Footer from '../../components/footer';
import PageLoader from '../../ui/loader';

import { selectedTheme } from '../../components/toggles/selectors';
import { THEMES } from '../../components/toggles/constants';

import { searchSelector } from '../../components/product_display/pagination/selectors';
import { getDefaultUrl } from '../../components/product_display/pagination/actions';
import { productSelector } from '../../ui/modal/selectors';
import { productData } from './selector';

import { filteredCategoryUrl } from '../../../utils';

import { productGrid } from './styles.module.scss';

function Submenu() {
  const dispatch = useDispatch();
  const { isDark } = useSelector(selectedTheme);
  const { products, isRow, category, loading } = useSelector(productData);
  const { rating, brand, pricing, page, limit } = useSelector(searchSelector);
  const productDataList = useSelector(productSelector);

  useEffect(() => {
    const { id } = category || {};

    dispatch(getProducts(filteredCategoryUrl(id, 1, limit)));
    dispatch(getDefaultUrl(getProducts(filteredCategoryUrl(id)).payload));
  }, [limit, category, dispatch]);

  return (
    <div className={`baseTheme ${isDark ? THEMES.DARK : THEMES.LIGHT}`}>
      {category && (
        <div>
          <SwitchLayout />
          <div className={productGrid}>
            <SideBar
              rating={rating}
              brand={brand}
              pricing={pricing}
              page={page}
              limit={limit}
              data={productDataList?.products?.data}
              action="product"
            />
            <div>
              {loading ? (
                <PageLoader />
              ) : (
                <Row products={products} isRow={isRow} isProduct={true} />
              )}
              {!loading && (
                <Pagination
                  products={products}
                  category={category}
                  limit={limit}
                />
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Submenu;
