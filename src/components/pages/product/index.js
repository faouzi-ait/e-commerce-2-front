import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './actions';

import SwitchLayout from '../../components/switch';
import Row from '../../ui/product_display/row';
import SideBar from '../../ui/product_display/sidebar';
import Pagination from '../../ui/product_display/pagination';
import PageLoader from '../../ui/loader';
import Footer from '../../components/footer';
import { filteredCategoryUrl } from '../../../utils';
import { getDefaultUrl } from '../../ui/product_display/pagination/actions';
import { productData } from './selector';
import { searchSelector } from '../../ui/product_display/pagination/selectors';
import { productSelector } from '../../ui/modal/selectors';

import { productGrid } from './styles.module.scss';

function Submenu() {
  const dispatch = useDispatch();
  const { products, isRow, category, loading } = useSelector(productData);
  const { rating, brand, pricing, page, limit } = useSelector(searchSelector);
  const {
    products: { data },
  } = useSelector(productSelector);

  useEffect(() => {
    const { id } = category || {};

    dispatch(getProducts(filteredCategoryUrl(id)));
    dispatch(getDefaultUrl(getProducts(filteredCategoryUrl(id)).payload));
  }, [category, dispatch]);

  return (
    <>
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
              data={data}
              action="product"
            />
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
