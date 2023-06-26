import React from 'react';

function Info({ details, userId }) {
  const { name, surname, email } = details?.data;

  console.log(name, surname, email, userId);

  return <div>info</div>;
}

export default Info;
