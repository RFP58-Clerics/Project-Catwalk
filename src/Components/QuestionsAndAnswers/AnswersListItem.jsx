/* eslint-disable react/function-component-definition */
import React from 'react';
import moment from 'moment';
import AnswerHelpful from './AnswerHelpful.jsx';

const AnswersListItem = ({answer}) => {
  console.log("date: ", answer.date )
  return (
    <div className="answer">
      <span className="answerBody">
        Answer: {answer.body}
      </span>
      <br></br>
      <span className="answerMisc">
        by {answer.answerer_name}, {moment((answer.date).toString()).format("MMM DD, YYYY")} <AnswerHelpful answerInfo={answer}/>
      </span>
      <br></br>
    </div>
  )
}

export default AnswersListItem;
