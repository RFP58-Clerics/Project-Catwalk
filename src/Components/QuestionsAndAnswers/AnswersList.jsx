import React from 'react';
import AnswersListItem from './AnswersListItem.jsx';

const AnswersList = ({ answers }) => {
  return (
    <div>
      {answers ? Object.values(answers).map((answer, i) => <AnswersListItem answer={answer} key={i}/>) : null }
    </div>
  )
}

export default AnswersList;
