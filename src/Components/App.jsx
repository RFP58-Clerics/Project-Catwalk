import React from 'react';
import ProductDetail from './ProductDetail/ProductDetail.jsx';
import RelatedApp from './RelatedItems/RelatedApp.jsx';
import RARApp from './RatingsAndReview/RARApp.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';


const App = (props) => {
  return (
    <div>
      <h1>Team Cleric!!</h1>
      <ProductDetail />
      <RelatedApp />
      <RARApp />
      <QuestionsAndAnswers />
    </div>
  )
}

export default App;