import React from 'react';
import * as cmpStyle from './styles.module.scss';

function PageLoader() {
  return (
    <div className={cmpStyle.loaderContainer}>
      <div className={cmpStyle.loader}>
        <img src="/images/loading-page.png" alt="load" />
      </div>
      {/* <div className={cmpStyle.loadingLabel}>Loading Products...</div> */}
    </div>
  );
}

export default PageLoader;
