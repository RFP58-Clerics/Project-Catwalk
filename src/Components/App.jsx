import React from 'react';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import ProductDetail from './ProductDetail/ProductDetail.jsx';
import RARApp from './RatingsAndReview/RARApp.jsx';


const App = (props) => (
  <div>
    <h1>Team Cleric!!</h1>
    <ProductDetail />
    <RARApp />
    <QuestionsAndAnswers />
  </div>
)
export default App;