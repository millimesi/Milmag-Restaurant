import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }) => {
  return (
    <FadeLoader
      color='rgb(128, 0, 0)'
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};
export default Spinner;