import React from 'react';
import { /*useDispatch, */ useSelector } from 'react-redux';

import Row from '../../components/product_display/row';

import {} from './styles.module.scss';

function Search() {
  // const dispatch = useDispatch();
  const bySearch = useSelector(
    (state) => state?.productsBySearch?.searchResults
  );
  const { isRow } = useSelector((state) => state?.products);
  
  return (
    <div>
      <Row products={bySearch} isRow={isRow} />
    </div>
  );
}

export default Search;
