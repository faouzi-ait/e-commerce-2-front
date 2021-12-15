import React from 'react';
import { useSelector } from 'react-redux';
import { THEMES } from '../../components/toggles/constants';
// import { t } from '../../../i18n/translate';

import Carousel from '../../components/carousel';
import HomeProducts from '../../components/products';
import AdvertBanner from '../../components/advert';
import Footer from '../../components/footer';

import { selectedTheme } from '../../components/toggles/selectors';
import { homeProductItems } from './selectors';

function Home() {
  const { isDark } = useSelector(selectedTheme);
  const items = useSelector(homeProductItems);

  return (
    <div className={`baseTheme app ${isDark ? THEMES.DARK : THEMES.LIGHT}`}>
      <Carousel />
      <HomeProducts products={items} />
      <AdvertBanner image="./images/banner-middle.jpg" />
      <AdvertBanner image="./images/gift_card.jpeg" />
      <Footer />
    </div>
  );
}

export default Home;
