import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getProducts } from '../../../pages/product/actions';
import { defaultUrl } from '../../../../utils';

import StarsFilter from './stars';
import Brand from './brand';
import Limit from './limit';
import Pricing from './price';

function Sidebar() {
  const dispatch = useDispatch();
  const { rating, brand, pricing, page, limit } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    dispatch(
      getProducts(`${defaultUrl(page, limit)}${rating}${brand}${pricing}`)
    );
  }, [limit, rating, brand, page, pricing, dispatch]);

  return (
    <div>
      <Limit />
      <StarsFilter />
      <Pricing />
      <Brand />
    </div>
  );
}

export default Sidebar;
