import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';

const QuestionsList = ({questions}) => {
  return (
    <div>
    {questions.map((question, i) => <QuestionsListItem question={question.question_body} key={i}/>)}
    </div>
  )
}

export default QuestionsList;