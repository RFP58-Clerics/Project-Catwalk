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
      {answersBody.map((answer, i) => <AnswersListItem answer={answer} key={i}/>)}
    </div>
  )
}

export default AnswersList;