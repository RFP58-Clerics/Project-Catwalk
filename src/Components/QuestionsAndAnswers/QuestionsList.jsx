import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';
import Helpful from './Helpful.jsx';
import AnswersList from './AnswersList.jsx';

const QuestionsList = ({questions}) => {
  return (
    <>
      <div>
        {questions.map((question, i) => <QuestionsListItem question={question.question_body} key={i}/>)}
        <Helpful />
      </div>
      <div>
        {questions.map((question, i) => <AnswersList answers={question.answers} key={i}/>)}
      </div>
    </>
  )
}

export default QuestionsList;