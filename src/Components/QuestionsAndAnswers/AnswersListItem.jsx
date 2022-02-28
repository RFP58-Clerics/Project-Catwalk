/* eslint-disable react/function-component-definition */
import React from 'react';
import moment from 'moment';
import AnswerHelpful from './AnswerHelpful.jsx';
import AnswerReport from './AnswerReport.jsx';
import ReviewPhotos from '../RatingsAndReview/ReviewPhotos.jsx';

const AnswersListItem = ({ answer, productInfo, questionInfo }) => (
  (
    <div className="answer">
      <span className="answerBody">
        A:
        &nbsp;
        {answer.body}
        <br />
        <br />
        {answer.photos ? <ReviewPhotos photos={answer.photos} /> : null}
        <br />
        <span className="userInfo">
          by
          &nbsp;
          {answer.answerer_name.toLowerCase() === 'seller' ? <b> {answer.answerer_name} </b> : answer.answerer_name}
          &nbsp;
          on
          &nbsp;
          {moment((answer.date).toString()).format('MMM DD, YYYY')}
        </span>
      </span>
      <AnswerHelpful answerInfo={answer} />
      <div>
        <AnswerReport productInfo={productInfo} questionInfo={questionInfo} answerInfo={answer} />
      </div>
    </div>
  )
);

export default AnswersListItem;
