import React from 'react';
import * as cmpStyle from './styles.module.scss';

const RenderProductDisplay = ({ item }) => {
  if (item?.length < 4) {
    return (
      <>
        <section className={cmpStyle.productDetailContainer}>
          <img
            src={item[0]?.photo}
            alt="product"
            className={cmpStyle.productImage}
          />
          <p tabIndex="0">{item[0]?.name}</p>
          <p>{item[0]?.description}</p>
          <p>{item[0]?.price}</p>
        </section>
        <a href="/#" className={cmpStyle.seeMoreLinkStyle}>
          See more
        </a>
      </>
    );
  } else {
    return (
      <section className={cmpStyle.productDetailGrid}>
        {(item || []).map((item, index) => (
          <img
            src={item?.photo}
            alt="product"
            className={cmpStyle.productImageGrid}
            key={index}
          />
        ))}
        <a href="/#" className={cmpStyle.seeMoreLinkStyle}>
          See more
        </a>
      </section>
    );
  }
};

function ProductDisplay({ title, item, ...rest }) {
  return (
    <section className={cmpStyle.productBox} {...rest}>
      <h2 tabIndex="0" className={cmpStyle.productBoxTitle}>
        {title}
      </h2>
      <RenderProductDisplay item={item} />
    </section>
  );
}

export default ProductDisplay;
