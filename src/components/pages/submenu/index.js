import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from './actions';

function Submenu({ location }) {
    const dispatch = useDispatch();
  const [query, setQuery] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    console.log(category?.categoryID);
    setQuery(location.search.split('=')[1]);
    setCategory(location.query);
  }, [location, category, query]);

  useEffect(() => {
    dispatch(getProducts(category?.categoryID));
  }, [category]);

  return (
    <>
      {category && (
        <div>
          Submenu Page, {location.query.category}, {category.categoryID}
        </div>
      )}
    </>
  );
}

export default Submenu;
