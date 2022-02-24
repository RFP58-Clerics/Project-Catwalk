/* eslint-disable react/function-component-definition */
import React from 'react';
import moment from 'moment';
import AnswerHelpful from './AnswerHelpful.jsx';
import AnswerReport from './AnswerReport.jsx';

const AnswersListItem = ({answer, productInfo, questionInfo}) => (
  (
    <div className="answer">
      <span className="answerBody">
        A:
        &nbsp;
        {answer.body}
      </span>
      <br />
      <span className="answerMisc">
        by
        &nbsp;
        {answer.answerer_name.toLowerCase() === 'seller' ? <b> {answer.answerer_name} </b> : answer.answerer_name}
        ,
        &nbsp;
        {moment((answer.date).toString()).format('MMM DD, YYYY')}
        <AnswerHelpful answerInfo={answer} />
        <AnswerReport productInfo={productInfo} questionInfo={questionInfo} answerInfo={answer} />
      </span>
    </div>
  )
);

export default AnswersListItem;
