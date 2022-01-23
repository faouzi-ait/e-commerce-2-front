import React from 'react';
import { useDispatch } from 'react-redux';

import { filteredCategoryUrl, paginationStyle } from '../../../utils';
import { getDefaultUrl, getPage } from '../product_display/pagination/actions';
import { getProducts } from '../../pages/product/actions';

function PaginationItems({ products, id, currentPage, limit, cmpStyle }) {
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

        return (
          <span
            key={i}
            onClick={() => dispatchFilterAction(id, page)}
            className={paginationStyle(cmpStyle, isCurrent)}>
            {i + 1}
          </span>
        );
      })}
    </>
  );
}

export default PaginationItems;
