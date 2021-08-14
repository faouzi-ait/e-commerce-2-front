import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../pages/product/actions';
import { getDefaultUrl /* getFilteredUrl */, getPage } from './actions';
import {
  defaultUrl,
  filteredCategoryUrl /* queryUrl */,
} from '../../../../utils';
import {
  active,
  pageNumbers,
  container,
  leftArrow,
  rightArrow,
} from './styles.module.scss';

function Navigation() {
  const dispatch = useDispatch();
  const { products, category } = useSelector((state) => state.products);
  const { totalNumberOfPages, currentPage, nextPage, previousPage } = products;
    const { limit } = useSelector((state) => state.search);

  const dispatchFilterAction = (id, page) => {
    dispatch(getPage(page));

    if (id === 0) {
      dispatch(getProducts(defaultUrl(page, limit))); // API Call to get the products
      dispatch(getDefaultUrl(getProducts(defaultUrl(page, limit)).payload)); // Dispatch URL to redux state
    } else {
      dispatch(getProducts(filteredCategoryUrl(id, page, limit))); // API Call to get the products
      dispatch(
        getDefaultUrl(getProducts(filteredCategoryUrl(id, page, limit)).payload)
      ); // Dispatch URL to redux state
    }
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
        {previousPage && navigationBtn(id, previousPage, left, leftArrow)}

        {Array.from(Array(nbOfPages), (e, i) => {
          let page = parseInt(i + 1);
          const isCurrent = currentPage === page;
          const style = `${pageNumbers} ${isCurrent && active}`;

          return (
            <div key={i}>{navigationBtn(id, page, page, style, isCurrent)}</div>
          );
        })}

        {nextPage && navigationBtn(id, nextPage, right, rightArrow)}
      </>
    );
  };

  return (
    <div className={container}>
      <Paginate nbOfPages={totalNumberOfPages} />
    </div>
  );
}

export default Navigation;
