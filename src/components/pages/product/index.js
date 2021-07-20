import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './actions';

import Row from '../../ui/ProductDisplay/row';
import Card from '../../ui/ProductDisplay/card';
import SideBar from '../../ui/ProductDisplay/sidebar';
import SwitchLayout from './LayoutSwitch';

function Submenu({ location }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState();
  const [category, setCategory] = useState();
  const { products, isRow } = useSelector((state) => state.products);

  useEffect(() => {
    setQuery(location.search.split('=')[1]);
    setCategory(location.query);
  }, [location, category, query]);

  useEffect(() => {
    const { id, page, limit } = category || {};
    // console.log(category)
    if (id === 0) {
      dispatch(getProducts(`&page=${page}&limit=${limit}`));
    } else {
      dispatch(getProducts(`category=${id}&page=1&limit=10`));
    }
  }, [category, dispatch]);

  const productLayout = (row) =>
    row ? (
      <Row products={products} category={category} />
    ) : (
      <Card products={products} category={category} />
    );

  return (
    <>
      {category && (
        <div>
          <SwitchLayout products={products} />
          <div style={{ display: 'grid', gridTemplateColumns: '25% 75%' }}>
            <SideBar />
            {productLayout(isRow)}
          </div>
        </div>
      )}
    </>
  );
}

export default Submenu;
