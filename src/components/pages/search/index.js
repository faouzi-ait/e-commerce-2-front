import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Row from '../../components/product_display/row';
import Footer from '../../components/footer';
import SearchRating from './search-ratings';
import SearchFilter from './search-filter';
import BrandFilter from './search-brand';
import PriceFilter from './search-price';
import PageLoader from '../../ui/loader';

import { selectedTheme } from '../../components/toggles/selectors';
import { THEMES } from '../../components/toggles/constants';

import { getSearch } from '../../components/header/actions';
import { searchSelector } from './selectors';

import * as localCmpStyle from './styles.module.scss';

function Search() {
  const dispatch = useDispatch();
  const { isDark } = useSelector(selectedTheme);
  const [starRating, setStarRating] = useState(null);
  const [searchLimit, setSearchLimit] = useState(null);
  const [searchBrand, setSearchBrand] = useState(null);
  const [searchPrice, setSearchPrice] = useState(null);
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

  let filteredProductList =
    starRating !== null || searchBrand !== null
      ? searchResults?.data?.items?.filter((item) => {
          if (starRating && searchBrand) {
            return item.ratings === starRating && item.brand === searchBrand;
          } else if (starRating && !searchBrand) {
            return item.ratings === starRating;
          } else if (!starRating && searchBrand) {
            return item.brand === searchBrand;
          }
        })
      : searchResults?.data?.items;

  filteredProductList = searchPrice
    ? filteredProductList.filter((item) => {
        if (searchPrice === 400) {
          return item.price >= searchPrice;
        } else {
          return item.price <= searchPrice;
        }
      })
    : filteredProductList;

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
    if (starRating || searchBrand || searchPrice) {
      return filteredProductObj?.data?.items?.length > 0
        ? filteredProductObj
        : filteredProductObjEmpty;
    } else {
      return searchResults;
    }
  };

  return (
    <>
      <section
        className={`baseTheme ${localCmpStyle.productGrid} ${
          isDark ? THEMES.DARK : THEMES.LIGHT
        }`}>
        <aside>
          <SearchFilter
            setSearchPage={setSearchPage}
            setSearchLimit={setSearchLimit}
          />
          <SearchRating rating={starRating} setStarRating={setStarRating} />
          <BrandFilter
            searchBrand={searchBrand}
            setSearchBrand={setSearchBrand}
            data={searchResults?.data}
          />
          <PriceFilter
            searchPrice={searchPrice}
            setSearchPage={setSearchPage}
            setSearchPrice={setSearchPrice}
          />
        </aside>
        {loading ? (
          <PageLoader />
        ) : (
          <main>
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
                      <button
                        type="button"
                        aria-label={`go to page ${i}`}
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
                      </button>
                    );
                  }
                )}
              </div>
            )}
          </main>
        )}
      </section>
      <Footer />
    </>
  );
}

export default Search;
