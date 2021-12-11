import React from 'react';
import * as cmpStyle from './styles.module.scss';

const TopFooter = () => {
  return <div className={cmpStyle.topFooter}>Back to Top</div>;
};

const MiddleFooter = () => {
  return (
    <>
      <div className={cmpStyle.middleFooter}>
        <ul>
          <li>Get to Know Us</li>
          <li>Career</li>
          <li>About Us</li>
          <li>UK Fairness Statement</li>
          <li>Sustainability</li>
        </ul>
        <ul>
          <li>Make Money with Us</li>
          <li>Sell on Amazon</li>
          <li>Sell on Amazon Business</li>
          <li>Sell on Amazon Handmade</li>
          <li>Associate Programme</li>
          <li>Fulfilment by Amazon</li>
          <li>Seller Fulfilled Prime</li>
          <li>Amazon Pay</li>
        </ul>
        <ul>
          <li>Amazon Payment Methods</li>
          <li>Amazon Platinum Mastercard</li>
          <li>Amazon Classic Mastercard</li>
          <li>Amazon Money Store</li>
          <li>Gift Cards</li>
          <li>Amazon Currency Converter</li>
          <li>Payment Methods Help</li>
          <li>Shop with Points</li>
          <li>Top Up Your Account</li>
          <li>Top Up Your Account in Store</li>
        </ul>
        <ul>
          <li>Let Us Help You</li>
          <li>COVID-19 and Amazon</li>
          <li>Track Packages or View Orders</li>
          <li>Delivery Rates & Policies</li>
          <li>Amazon Prime</li>
          <li>Returns & Replacements</li>
          <li>Recycling</li>
          <li>Manage Your Content and Devices</li>
        </ul>
      </div>
      <div className={cmpStyle.countries}>
        <div className={cmpStyle.footerLogo}>
          <img src="/images/amazon-logo.png" alt="logo" />
        </div>
        <ul>
          <li>Australia</li>
          <li>Brazil</li>
          <li>Canada</li>
          <li>China</li>
          <li>France</li>
          <li>Germany</li>
          <li>India</li>
          <li>Italy</li>
          <li>Japan</li>
          <li>Mexico</li>
          <li>Netherlands</li>
          <li>Poland</li>
          <li>Singapore</li>
          <li>Spain</li>
          <li>Turkey</li>
          <li>United Arab Emirates</li>
        </ul>
      </div>
    </>
  );
};

const BottomFooter = () => {
  return (
    <>
      <div className={`${cmpStyle.countries} ${cmpStyle.bottomLinks}`}>
        <ul>
          <li>Conditions of Use & Sale</li>
          <li>Privacy Notice</li>
          <li>Cookies Notice</li>
          <li>Interest-Based Ads Notice</li>
          <li>©1996-2021, Amazon.com, Inc. or its affiliates</li>
        </ul>
      </div>
    </>
  );
};

function index() {
  return (
    <>
      <TopFooter />
      <MiddleFooter />
      <BottomFooter />
    </>
  );
}

export default index;
