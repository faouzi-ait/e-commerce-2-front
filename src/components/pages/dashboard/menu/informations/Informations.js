import React from 'react';

import Info from './user-details/info';
// import Profile from './user-details/profile';
import Password from './user-details/password';

function Informations({ details, userId }) {
  return (
    <div style={{ padding: '1rem 3rem' }}>
      {/* <Profile /> */}
      <Info details={details} userId={userId} />
      <Password />
    </div>
  );
}

export default Informations;
