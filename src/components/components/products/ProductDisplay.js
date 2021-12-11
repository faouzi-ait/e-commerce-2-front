import React from 'react';
import * as cmpStyle from './styles.module.scss';

function ProductDisplay({ title, item }) {
  const renderProductDisplay = (item) => {
    if (item?.length < 4) {
      return (
        <div className={cmpStyle.productDetailContainer}>
          <img
            src={item[0]?.photo}
            alt="product"
            className={cmpStyle.productImage}
          />
          <div>{item[0].name}</div>
          <div>{item[0].description}</div>
          <div>{item[0].price}</div>
        </div>
      );
    } else {
      return (
        <div className={cmpStyle.productDetailGrid}>
          {item?.map((item, index) => (
            <img
              src={item.photo}
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

  return (
    <div className={cmpStyle.productBox}>
      <h2 className={cmpStyle.productBoxTitle}>{title}</h2>
      {renderProductDisplay(item)}
    </div>
  );
}

export default ProductDisplay;
