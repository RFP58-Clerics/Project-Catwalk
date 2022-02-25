/* eslint-disable max-len */
import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';
import styled from 'styled-components';

const Button = styled.button`
  background: #2b2b2b;
  color: white;
  font-size: 12px;
  padding: 12px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  border-radius: 0.25rem;
`;

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
    this.setState(() => ({
    // this.setState((oldState) => ({
      // showCount: oldState.showCount + 2,
      clicked: !this.state.clicked,
    }));
  }

  render() {
    let questions = this.props.questions.slice(0, this.state.showCount);
    if (this.state.clicked) {
      questions = this.props.questions.slice();
    } else {
      questions = this.props.questions.slice(0, this.state.showCount);
    }
    return (
      <div className="scrollQuestions questionContent">
        {questions.map((question, i) => <QuestionsListItem productInfo={this.props.productInfo} questionInfo={question} key={i} getQuestions={this.props.getQuestions} />)}
        {this.state.showCount < this.props.questions.length && <Button className="moreQuestionsBtn" onClick={this.handleMoreButton}>{this.state.clicked ? 'Collapse Questions' : 'More Questions'}</Button>}
      </div>
    );
  }
}

export default QuestionsList;
