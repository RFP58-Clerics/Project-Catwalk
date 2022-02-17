import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCount: 2,
    }
    this.handleMoreButton = this.handleMoreButton.bind(this);
  }

  handleMoreButton(event) {
    this.setState((prevState) => {showCount: prevState.showCount + 2});
  }

  render() {
    const questions = this.props.questions.slice(0, this.state.showCount);
    return (
      <div className="question">
        {this.props.questions.map((question, i) => <QuestionsListItem productInfo={this.props.productInfo} questionInfo={question} key={i} getQuestions={this.props.getQuestions}/>)}
        {this.state.showCount < this.props.questions.length && <button onClick={this.handleMoreButton}>More Questions</button>}
      </div>
    )
  }
}

export default QuestionsList;
