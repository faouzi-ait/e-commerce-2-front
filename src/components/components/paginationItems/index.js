import React from 'react';
import { useDispatch } from 'react-redux';

import { filteredCategoryUrl } from '../../../utils';
import { getDefaultUrl, getPage } from '../product_display/pagination/actions';
import { getProducts } from '../../pages/product/actions';

// impor * as localCmpStyle from './styles.module.scss';
import * as localCmpStyle from '../../pages/search/styles.module.scss';

function PaginationItems({ products, id, currentPage, limit }) {
  const dispatch = useDispatch();

  const dispatchFilterAction = (id, page) => {
    dispatch(getPage(page));
    dispatch(getProducts(filteredCategoryUrl(id, page, limit)));
    dispatch(
      getDefaultUrl(getProducts(filteredCategoryUrl(id, page, limit)).payload)
    );
  };

  return (
    <>
      {Array.from(Array(products?.totalNumberOfPages), (e, i) => {
        let page = parseInt(i + 1);
        const isCurrent = currentPage === page;

        const style = `${localCmpStyle.navigationLink} ${
          localCmpStyle.pageNumbers
        } ${isCurrent && localCmpStyle.active}`;

        return (
          <button
            key={i}
            type="button"
            className={style}
            aria-label={`go to page ${i + 1}`}
            onClick={() => dispatchFilterAction(id, page)}>
            {i + 1}
          </button>
        );
      })}
    </>
  );
}

export default PaginationItems;
