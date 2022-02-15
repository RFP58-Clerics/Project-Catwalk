import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';
import Helpful from './Helpful.jsx';

const QuestionsList = ({questions}) => {
  return (
    <div>
    {questions.map((question, i) => <QuestionsListItem question={question.question_body} key={i}/>)}
    <Helpful />
    </div>
  )
}

export default QuestionsList;