import React from 'react';
import AnswersListItem from './AnswersListItem.jsx';

const AnswersList = ({answers}) => {
  var answersBody = [];
  if (answers) {
    Object.values(answers).forEach(answer => {
      answersBody.push(answer.body);
    })
    return answersBody;
  }

  return (
    <div>
      {answers ? Object.values(answers).map((answer, i) => <AnswersListItem answer={answer.body} key={i}/>) : null }
    </div>
  )
}

export default AnswersList;
