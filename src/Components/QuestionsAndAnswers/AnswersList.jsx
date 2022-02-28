import React from 'react';
import AnswersListItem from './AnswersListItem.jsx';
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

class AnswersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCount: 1,
      clicked: false,
    };
    this.handleMoreButton = this.handleMoreButton.bind(this);
  }

  handleMoreButton() {
    const { clicked } = this.state;
    this.setState((oldState) => ({
      // showCount: oldState.showCount + 2,
      clicked: !clicked,
    }));
  }

  render() {
    const { answers, productInfo, questionInfo } = this.props;
    const { showCount, clicked } = this.state;
    let answersList = answers.slice(0, showCount);
    if (this.state.clicked) {
      answersList = answers.slice();
    }
    return (
      <div className="scrollAnswers">
        {answersList ? Object.values(answersList).map((answer, i) => <AnswersListItem productInfo={productInfo} questionInfo={questionInfo} answer={answer} key={i}/>) : null }
        {showCount < answers.length && <Button className="moreAnswersBtn" onClick={this.handleMoreButton}>{clicked ? 'Collapse Answers' : 'More Answers'}</Button>}
      </div>
    );
  }
}

export default AnswersList;
