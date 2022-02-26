/* eslint-disable max-len */
import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';
import styled from 'styled-components';

const Button = styled.button`
  background: #2b2b2b;
  color: white;
  font-size: 12px;
  padding: 10px;
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
    const { clicked } = this.state;
    this.setState(() => ({
      clicked: !clicked,
    }));
  }

  render() {
    const { questions, productInfo, getQuestions } = this.props;
    const { showCount, clicked } = this. state;
    let questionsList = questions.slice(0, showCount);
    if (clicked) {
      questionsList = questions.slice();
    } else {
      questionsList = questions.slice(0, showCount);
    }
    return (
      <div className="scrollQuestions questionContent">
        {questionsList.map((question, i) => <QuestionsListItem productInfo={productInfo} questionInfo={question} key={i} getQuestions={getQuestions} />)}
        {showCount < questions.length && <Button className="moreQuestionsBtn" onClick={this.handleMoreButton}>{clicked ? 'Collapse Questions' : 'More Questions'}</Button>}
      </div>
    );
  }
}

export default QuestionsList;
