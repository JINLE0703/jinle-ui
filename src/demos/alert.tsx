import React from 'react';
import Alert from '../components/Alert/alert';

function alertDemo() {
  return (
    <>
      <Alert message="this is msg" title="this is title" />
      <Alert message="this is msg" title="this is title" type="danger" />
      <Alert message="this is msg" title="this is title" type="success" />
    </>
  );
}

export default alertDemo;
