import React from 'react';
<<<<<<< HEAD
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import ProductDetail from './ProductDetail/ProductDetail.jsx';
=======
import ProductDetail from './ProductDetail/ProductDetail.jsx';
import RelatedApp from './RelatedItems/RelatedApp.jsx';
>>>>>>> fafb034b19e218b894e27e035b0f87b701c705de
import RARApp from './RatingsAndReview/RARApp.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';


<<<<<<< HEAD
const App = (props) => (
  <div>
    <h1>Team Cleric!!</h1>
    <ProductDetail />
    <RARApp />
    <QuestionsAndAnswers />
  </div>
)
=======
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

>>>>>>> fafb034b19e218b894e27e035b0f87b701c705de
export default App;