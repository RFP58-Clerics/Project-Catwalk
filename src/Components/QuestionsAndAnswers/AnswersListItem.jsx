/* eslint-disable react/function-component-definition */
import React from 'react';

const AnswersListItem = ({answer}) => {
  return (
    <div>
      {answer.body}
      <br></br>
    </div>
  )
}

export default AnswersListItem;
