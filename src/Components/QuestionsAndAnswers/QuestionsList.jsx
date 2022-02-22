/* eslint-disable max-len */
import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCount: 4,
      clicked: false,
    };
    this.handleMoreButton = this.handleMoreButton.bind(this);
  }

  handleMoreButton() {
    this.setState((oldState) => ({
      showCount: oldState.showCount + 2,
      clicked: true,
    }));
  }

  render() {
    let questions = this.props.questions.slice(0, this.state.showCount);
    if (this.state.clicked) {
      questions = this.props.questions.slice();
    }
    return (
      <div className="scrollQuestions questionContent">
        {questions.map((question, i) => <QuestionsListItem productInfo={this.props.productInfo} questionInfo={question} key={i} getQuestions={this.props.getQuestions} />)}
        {this.state.showCount < this.props.questions.length && <button onClick={this.handleMoreButton}>More Questions</button>}
      </div>
    );
  }
}

export default QuestionsList;
