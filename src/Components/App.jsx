import React from 'react';

import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import Productdetail from './ProductDetail/Productdetail.jsx';
import RARApp from './RatingsAndReview/RARApp.jsx';


const App = (props) => (
  <div>
    <h1>Team Cleric!!</h1>
    <Productdetail />
    <RARApp />
    <QuestionsAndAnswer />
  </div>
)

export default App;