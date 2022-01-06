import React from 'react';
import Modal from '../../../ui/modal';
import { useSelector } from 'react-redux';
import ProductDisplay from './ProductDisplay';

import { THEMES } from '../../../components/toggles/constants';
import { selectedTheme } from '../../../components/toggles/selectors';

import { container, gridContainer, marginLeft } from './styles.module.scss';

function Row({ products, isRow, isProduct = false, isSearch = false }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [productId, setProductId] = React.useState(null);
  const { isDark } = useSelector(selectedTheme);
  const item = products?.data;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div
      className={`baseTheme ${
        isDark ? THEMES.DARK : THEMES.LIGHT
      } ${marginLeft}`}>
      <div className={container}></div>
      <div className={`${isRow ? gridContainer : ''}`}>
        {(item?.items || []).map((item) => (
          <ProductDisplay
            key={item._id}
            isRow={isRow}
            item={item}
            openModal={openModal}
            setProductId={setProductId}
          />
        ))}
      </div>
      <Modal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        productId={productId}
        isProduct={isProduct}
        isSearch={isSearch}
      />
    </div>
  );
}

export default Row;
