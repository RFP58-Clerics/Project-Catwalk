import React from 'react';

import QuestionsAndAnswer from './QuestionsAndAnswer';
import Productdetail from './ProductDetail/Productdetail.jsx';
import RARApp from './RatingsAndReview/RARApp.jsx';


const App = (props) => (
  <div>
    <h1>Team Cleric!!</h1>
    <QuestionsAndAnswer />
    <RARApp />
    <ProductDetail />
  </div>
)

export default App;