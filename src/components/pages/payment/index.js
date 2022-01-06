import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../../components/footer';

import { selectedTheme } from '../../components/toggles/selectors';
import { THEMES } from '../../components/toggles/constants';
import * as localCmp from './styles.module.scss';

function Payment() {
  const { isDark } = useSelector(selectedTheme);

  return (
    <div className={`baseTheme ${isDark ? THEMES.DARK : THEMES.LIGHT}`}>
      <div className={localCmp.cartPageLayout}>Payment</div>
      <Footer />
    </div>
  );
}

export default Payment;
