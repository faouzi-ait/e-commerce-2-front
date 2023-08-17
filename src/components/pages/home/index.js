import React from 'react';
import { useSelector } from 'react-redux';
// import { t } from '../../../i18n/translate';

import Page from '../../../components/components/container';
import HomeProducts from '../../components/products';
import AdvertBanner from '../../components/advert';
import Carousel from '../../components/carousel';
import Footer from '../../components/footer';

import { homeProductItems } from './selectors';

function Home() {
  const items = useSelector(homeProductItems);

  return (
    <Page>
      <Carousel />
      <HomeProducts products={items} />
      <AdvertBanner image="./images/banner-middle.jpg" />
      <AdvertBanner image="./images/gift_card.jpeg" />
      <Footer />
    </Page>
  );
}

export default Home;
