import React from 'react';
import { /* useSelector, */ useDispatch } from 'react-redux';

import { getProducts } from '../../../pages/product/actions';
import { filteredCategoryUrl } from '../../../../utils';
import { getDefaultUrl, getPage } from './actions';

import * as cmpStyle from './styles.module.scss';

function Pagination({ products, category, limit }) {
  const dispatch = useDispatch();

  const dispatchFilterAction = (id, page) => {
    dispatch(getPage(page));

    dispatch(getProducts(filteredCategoryUrl(id, page, limit)));
    dispatch(
      getDefaultUrl(getProducts(filteredCategoryUrl(id, page, limit)).payload)
    );
  };

  const navigationBtn = (id, pageNb, label, className, isCurrent) => {
    return (
      <span
        onClick={() => {
          if (!isCurrent) dispatchFilterAction(id, pageNb);
        }}
        className={className}>
        {label}
      </span>
    );
  };

  const Paginate = ({ nbOfPages }) => {
    const { id } = category;
    const left = <i className="fa fa-chevron-left"></i>;
    const right = <i className="fa fa-chevron-right"></i>;

    return (
      <>
        {products?.previousPage &&
          navigationBtn(id, products?.previousPage, left, cmpStyle.leftArrow)}

        {Array.from(Array(nbOfPages), (e, i) => {
          let page = parseInt(i + 1);
          const isCurrent = products?.currentPage === page;
          const style = `${cmpStyle.pageNumbers} ${
            isCurrent && cmpStyle.active
          }`;

          return (
            <div key={i}>{navigationBtn(id, page, page, style, isCurrent)}</div>
          );
        })}

        {products?.nextPage &&
          navigationBtn(id, products?.nextPage, right, cmpStyle.rightArrow)}
      </>
    );
  };

  return (
    <div className={cmpStyle.container}>
      <Paginate nbOfPages={products?.totalNumberOfPages} />
    </div>
  );
}

export default Pagination;
