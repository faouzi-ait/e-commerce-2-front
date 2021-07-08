import React from 'react';
// import { Link } from 'react-router-dom';
import {
  productBox,
  productBoxTitle,
  productImage,
  productDetailContainer,
  productDetailGrid,
  productImageGrid,
  seeMoreLinkStyle,
} from './styles.module.scss';

function ProductDisplay({ title, item }) {
  const renderProductDisplay = (item) => {
    if (item?.length === 2) {
      return (
        <div className={productDetailContainer}>
          <img src={item[0]?.photo} alt="product" className={productImage} />
          <div>{item[0].name}</div>
          <div>{item[0].description}</div>
          <div>{item[0].price}</div>
        </div>
      );
    } else {
      return (
        <div className={productDetailGrid}>
          {item?.map((item, index) => (
            <img src={item.photo} alt="product" className={productImageGrid} key={index} />
          ))}
          <div className={seeMoreLinkStyle}>See more</div>
        </div>
      );
    }
  };

  return (
    <div className={productBox}>
      <h2 className={productBoxTitle}>{title}</h2>
      {renderProductDisplay(item)}
      {/* {item[0]?.photo && (
        <div className={productDetailContainer}>
          <img src={item[0]?.photo} alt="product" className={productImage} />
          <div>{item[0].name}</div>
          <div>{item[0].description}</div>
          <div>{item[0].price}</div>
        </div>
      )} */}
    </div>
  );
}

export default ProductDisplay;
