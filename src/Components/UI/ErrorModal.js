import React from 'react';
import Card from './Card';

const ErrorModal = props => {

  return (
    <Card>
      <h1>An Error Occurred!</h1>
      <p>{props.error}</p>

      <button onClick={ props.onClear }>Ok</button>
    </Card>
  );
};

export default ErrorModal;
