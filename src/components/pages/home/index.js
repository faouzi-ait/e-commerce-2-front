import React from 'react';
import { useSelector } from 'react-redux';
import { THEMES } from '../../ui/toggles/constants';
// import { t } from '../../../i18n/translate';

import { selectedTheme } from '../../ui/toggles/selectors';
import { homeProductItems } from './selectors';

import Carousel from './Carousel';
import HomeProducts from './HomeProducts';
import AdvertBanner from './Advert';
import Footer from '../../ui/footer';

function Home() {
  const { isDark } = useSelector(selectedTheme);
  const { products } = useSelector(homeProductItems);

  return (
    <div className={`baseTheme app ${isDark ? THEMES.DARK : THEMES.LIGHT}`}>
      <Carousel />
      <HomeProducts products={products || {}} />
      <AdvertBanner image="./images/banner-middle.jpg" />
      <AdvertBanner image="./images/gift_card.jpeg" />
      <Footer />
    </div>
  );
}

export default Home;
