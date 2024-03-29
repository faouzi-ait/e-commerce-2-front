import React from 'react';
import {
  middlefooterData,
  bottomCountryFooter,
  termsConditions,
} from '../../../utils';

import * as cmpStyle from './styles.module.scss';

const Footer = () => {
  return (
    <footer>
      <section className={cmpStyle.topFooter}>
        <a
          href="/#"
          aria-label="Back to top link"
          style={{ all: 'unset', cursor: 'pointer' }}
        >
          Back to Top
        </a>
      </section>
      <section className={cmpStyle.middleFooter}>
        {middlefooterData.map((cols, i) => (
          <ul key={i}>
            {cols.children.map((item, j) => (
              <li key={j}>
                <a
                  href="/#"
                  tabIndex="0"
                  aria-label={item}
                  style={{ all: 'unset', cursor: 'pointer' }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </section>
      <section className={cmpStyle.countries}>
        <div className={cmpStyle.footerLogo}>
          <img src="/images/amazon-logo.png" alt="logo" />
        </div>
        <ul aria-label="list of countries served by amazon">
          {bottomCountryFooter.map((item, k) => (
            <li key={k}>
              <span aria-label={item} tabIndex="0">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${cmpStyle.countries} ${cmpStyle.bottomLinks}`}>
        <ul>
          {termsConditions.map((item, l) => (
            <li key={l}>{item}</li>
          ))}
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
