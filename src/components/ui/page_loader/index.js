import React from 'react';
import { loaderContainer, loader, loadingLabel } from './styles.module.scss';

function PageLoader() {
  return (
    <div className={loaderContainer}>
      <div className={loader}>
        <img src="/images/loading-page.gif" alt="load" />
      </div>
      <div className={loadingLabel}>Loading Products...</div>
    </div>
  );
}

export default PageLoader;
