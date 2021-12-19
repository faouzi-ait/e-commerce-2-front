import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getProducts } from '../../../pages/product/actions';
import { defaultUrl } from '../../../../utils';

import StarsFilter from './stars';
import Pricing from './price';
import Brand from './brand';
import Limit from './limit';

function Sidebar({ rating, brand, pricing, page, limit, data, action }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProducts(`${defaultUrl(page, limit)}${rating}${brand}${pricing}`)
    );
  }, [limit, rating, brand, page, pricing, action, dispatch]);

  return (
    <div>
      <Limit />
      <StarsFilter rating={rating} />
      <Pricing pricing={pricing} />
      <Brand brand={brand} data={data} />
    </div>
  );
}

export default Sidebar;
