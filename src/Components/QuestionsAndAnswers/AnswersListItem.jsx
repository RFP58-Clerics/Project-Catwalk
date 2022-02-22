/* eslint-disable react/function-component-definition */
import React from 'react';
import moment from 'moment';
import AnswerHelpful from './AnswerHelpful.jsx';
import AnswerReport from './AnswerReport.jsx';

const AnswersListItem = ({answer}) => (
  (
    <div className="answer">
      <span className="answerBody">
        A:
        {answer.body}
      </span>
      <br />
      <span className="answerMisc">
        by
        {answer.answerer_name}
        ,
        {moment((answer.date).toString()).format('MMM DD, YYYY')}
        <AnswerHelpful answerInfo={answer} />
        <AnswerReport />
      </span>
    </div>
  )
);

export default AnswersListItem;
