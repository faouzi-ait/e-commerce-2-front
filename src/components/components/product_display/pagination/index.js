import React from 'react';
import { useDispatch } from 'react-redux';
import PaginationItems from '../../paginationItems';
import PaginationBtn from '../../PaginationBtn';
import Page from '../../../../components/components/container';

import { filteredCategoryUrl } from '../../../../utils';
import { getProducts } from '../../../pages/product/actions';
import { getDefaultUrl, getPage } from './actions';

import * as cmpStyle from './styles.module.scss';

function Pagination({ products, category, limit }) {
  const { currentPage, previousPage, nextPage } = products;
  const dispatch = useDispatch();
  const { id } = category;

  const dispatchFilterAction = (id, page) => {
    dispatch(getPage(page));
    dispatch(getProducts(filteredCategoryUrl(id, page, limit)));
    dispatch(
      getDefaultUrl(getProducts(filteredCategoryUrl(id, page, limit)).payload)
    );
  };

  return (
    <Page style={cmpStyle.container}>
      <PaginationBtn
        type="button"
        aria-label="go to previous page"
        label={<i className="fa fa-chevron-left"></i>}
        pageNb={previousPage}
        className={cmpStyle.leftArrow}
        onClick={() => {
          if (previousPage) dispatchFilterAction(id, previousPage);
        }}
      />

      <PaginationItems id={id} products={products} currentPage={currentPage} />

      <PaginationBtn
        type="button"
        aria-label="go to next page"
        label={<i className="fa fa-chevron-right"></i>}
        pageNb={nextPage}
        className={cmpStyle.rightArrow}
        onClick={() => {
          if (nextPage) dispatchFilterAction(id, nextPage);
        }}
      />
    </Page>
  );
}

export default Pagination;
