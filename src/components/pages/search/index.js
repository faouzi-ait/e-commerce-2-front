import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageLoader from '../../ui/loader';
import SearchFilter from './search-filter';
import StarsRating from './search-ratings';
import BrandFilter from './search-brand';
import Footer from '../../components/footer';
import Row from '../../components/product_display/row';

import { getSearch } from '../../components/header/actions';
import { searchSelector } from './selectors';

import * as localCmpStyle from './styles.module.scss';

function Search() {
  const dispatch = useDispatch();
  const [searchLimit, setSearchLimit] = useState(null);
  const [starRating, setStarRating] = useState(null);
  const [searchBrand, setSearchBrand] = useState(null);
  const [searchPage, setSearchPage] = useState(1);

  // const { isRow } = useSelector((state) => state?.products);
  const { searchResults, searchString, loading } = useSelector(searchSelector);

  useEffect(() => {
    dispatch(
      getSearch(
        `search=${searchString}&limit=${searchLimit}&page=${searchPage}`
      )
    );
  }, [searchString, searchLimit, searchPage, dispatch]);

  const filteredProductList = searchResults?.data?.items?.filter((item) => {
    if (starRating && searchBrand) {
      return item.ratings === starRating && item.brand === searchBrand;
    } else if (starRating && !searchBrand) {
      return item.ratings === starRating;
    } else if (!starRating && searchBrand) {
      return item.brand === searchBrand;
    }
  });

  const filteredProductObj = {
    data: {
      items: filteredProductList,
    },
  };

  const filteredProductObjEmpty = {
    data: {
      items: [],
    },
  };

  const filterArray = () => {
    if (starRating || searchBrand) {
      return filteredProductObj?.data?.items?.length > 0
        ? filteredProductObj
        : filteredProductObjEmpty;
    } else {
      return searchResults;
    }
  };

  return (
    <>
      <div className={localCmpStyle.productGrid}>
        <div>
          <SearchFilter
            setSearchPage={setSearchPage}
            setSearchLimit={setSearchLimit}
          />
          <StarsRating rating={starRating} setStarRating={setStarRating} />
          <BrandFilter
            searchBrand={searchBrand}
            setSearchBrand={setSearchBrand}
            data={searchResults?.data}
          />
          {/* BY PRICE FILTER */}
        </div>
        {loading ? (
          <PageLoader />
        ) : (
          <div>
            <Row products={filterArray()} isRow={true} isSearch={true} />
            {!starRating && !searchBrand && (
              <div className={localCmpStyle.layoutDisplay}>
                {Array.from(
                  Array(searchResults?.totalNumberOfPages),
                  (e, i) => {
                    let page = parseInt(i + 1);
                    const isCurrent = searchResults?.currentPage === page;
                    const style = `${localCmpStyle.navigationLink} ${
                      localCmpStyle.pageNumbers
                    } ${isCurrent && localCmpStyle.active}`;

                    return (
                      <div
                        key={i}
                        className={style}
                        onClick={() => {
                          setSearchPage(page);
                          !isCurrent &&
                            dispatch(
                              getSearch(
                                `search=${searchString}&limit=${searchLimit}&page=${page}`
                              )
                            );
                        }}>
                        {page}
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Search;
