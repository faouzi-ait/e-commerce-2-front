import React from 'react';
import Modal from '../../../ui/modal';
import { useSelector } from 'react-redux';
import ProductDisplay from './ProductDisplay';

import { THEMES } from '../../../components/toggles/constants';
import { selectedTheme } from '../../../components/toggles/selectors';

import * as styles from './styles.module.scss';

function Row({
  products,
  isRow = true,
  isProduct = false,
  isSearch = false,
  showDetails = false,
}) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [productId, setProductId] = React.useState(null);
  const { isDark } = useSelector(selectedTheme);
  const item = products?.data;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  

  return (
    <section
      className={`baseTheme ${isDark ? THEMES.DARK : THEMES.LIGHT} ${
        styles.marginLeft
      }`}>
      {item.items.length !== 0 ? (
        <section className={`${isRow ? styles.gridContainer : ''}`}>
          {(item?.items || []).map((item) => (
            <ProductDisplay
              key={item._id}
              isRow={isRow}
              item={item}
              openModal={openModal}
              setProductId={setProductId}
              showDetails={showDetails}
            />
          ))}
        </section>
      ) : (
        <section className={styles.noProductsFoundStyle}>
          No products to display
        </section>
      )}
      <Modal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        productId={productId}
        isProduct={isProduct}
        isSearch={isSearch}
      />
    </section>
  );
}

export default Row;
