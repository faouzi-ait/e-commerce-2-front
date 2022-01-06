import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import StarsFilter from './stars';
import Pricing from './price';
import Brand from './brand';
import Limit from './limit';

import { defaultUrl } from '../../../../utils';
import { getProducts } from '../../../pages/product/actions';
import { THEMES } from '../../../components/toggles/constants';
import { selectedTheme } from '../../../components/toggles/selectors';

function Sidebar({ rating, brand, pricing, page, limit, data, action }) {
  const { isDark } = useSelector(selectedTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProducts(`${defaultUrl(page, limit)}${rating}${brand}${pricing}`)
    );
  }, [limit, rating, brand, page, pricing, action, dispatch]);

  return (
    <div className={`baseTheme ${isDark ? THEMES.DARK : THEMES.LIGHT}`}>
      <Limit />
      <StarsFilter rating={rating} />
      <Pricing pricing={pricing} />
      <Brand brand={brand} data={data} />
    </div>
  );
}

export default Sidebar;
