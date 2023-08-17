import React from 'react';

import Info from './user-details/info';
// import Profile from './user-details/profile';
import Password from './user-details/password';

function Informations({ details, userId }) {
  return (
    <main>
      {/* <Profile /> */}
      <Info details={details} userId={userId} />
      <Password userId={userId} />
    </main>
  );
}

export default Informations;
