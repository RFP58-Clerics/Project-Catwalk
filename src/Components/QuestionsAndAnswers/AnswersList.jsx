import React from 'react';
import AnswersListItem from './AnswersListItem.jsx';

const AnswersList = ({answers}) => {
  return (
    <div>
      {answers.map((answer, i) => <AnswersListItem answer={answer} key={i}/> )}
    </div>
  )
}

export default AnswersList;
