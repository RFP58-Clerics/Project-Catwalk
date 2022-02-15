import React from 'react';

const AnswersListItem = ({answer}) => {
  console.log('answer: ', answer);
  return (
    <div>
      {answer}
    </div>
  )
}

export default AnswersListItem;