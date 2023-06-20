import React from 'react';
import * as cmpStyle from './styles.module.scss';

const RenderProductDisplay = ({ item }) => {
  if (item?.length < 4) {
    return (
      <div className={cmpStyle.productDetailContainer}>
        <img
          src={item[0]?.photo}
          alt="product"
          className={cmpStyle.productImage}
        />
        <div className={cmpStyle.homePageProducts}>{item[0]?.name}</div>
        <div className={cmpStyle.homePageProducts}>{item[0]?.description}</div>
        <div className={cmpStyle.homePageProducts}>{item[0]?.price}</div>
      </div>
    );
  } else {
    return (
      <div className={cmpStyle.productDetailGrid}>
        {(item || []).map((item, index) => (
          <img
            src={item?.photo}
            alt="product"
            className={cmpStyle.productImageGrid}
            key={index}
          />
        ))}
        <div className={cmpStyle.seeMoreLinkStyle}>See more</div>
      </div>
    );
  }
};

function ProductDisplay({ title, item }) {
  return (
    <div className={cmpStyle.productBox}>
      <h2 className={cmpStyle.productBoxTitle}>{title}</h2>
      <RenderProductDisplay item={item} />
    </div>
  );
}

export default ProductDisplay;
