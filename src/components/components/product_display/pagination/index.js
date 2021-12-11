import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../pages/product/actions';
import { getDefaultUrl, getPage } from './actions';
import { filteredCategoryUrl } from '../../../../utils';
import * as cmpStyle from './styles.module.scss';

import { searchSelector } from './selectors';
import { productSelector } from '../../modal/selectors';

function Navigation() {
  const dispatch = useDispatch();
  const { products, category } = useSelector(productSelector);
  const { limit } = useSelector(searchSelector);
  const { totalNumberOfPages, currentPage, nextPage, previousPage } = products;

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
        {previousPage &&
          navigationBtn(id, previousPage, left, cmpStyle.leftArrow)}

        {Array.from(Array(nbOfPages), (e, i) => {
          let page = parseInt(i + 1);
          const isCurrent = currentPage === page;
          const style = `${cmpStyle.pageNumbers} ${
            isCurrent && cmpStyle.active
          }`;

          return (
            <div key={i}>{navigationBtn(id, page, page, style, isCurrent)}</div>
          );
        })}

        {nextPage && navigationBtn(id, nextPage, right, cmpStyle.rightArrow)}
      </>
    );
  };

  return (
    <div className={cmpStyle.container}>
      <Paginate nbOfPages={totalNumberOfPages} />
    </div>
  );
}

export default Navigation;
