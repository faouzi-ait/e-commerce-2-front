import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import StarsFilter from './stars';
import Pricing from './price';
import Brand from './brand';
import Limit from './limit';
import Page from '../../../../components/components/container';

import { defaultUrl } from '../../../../utils';
import { getProducts } from '../../../pages/product/actions';

function Sidebar({ rating, brand, pricing, page, limit, data, action }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProducts(`${defaultUrl(page, limit)}${rating}${brand}${pricing}`)
    );
  }, [limit, rating, brand, page, pricing, action, dispatch]);

  return (
    <Page>
      <Limit />
      <StarsFilter rating={rating} />
      <Pricing pricing={pricing} />
      <Brand brand={brand} data={data} />
    </Page>
  );
}

export default Sidebar;
