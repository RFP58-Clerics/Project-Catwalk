import React from 'react';
import AnswersListItem from './AnswersListItem.jsx';
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

class AnswersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCount: 2,
      // clicked: false,
    };
    this.handleMoreButton = this.handleMoreButton.bind(this);
  }

  handleMoreButton() {
    this.setState((oldState) => ({
      showCount: oldState.showCount + 2,
      // clicked: true,
    }));
  }

  render() {
    let answers = this.props.answers.slice(0, this.state.showCount);
    // if (this.state.clicked) {
    //   answers = this.props.answers.slice();
    // }
    return (
      <div className="scrollAnswers">
        {answers ? Object.values(answers).map((answer, i) => <AnswersListItem productInfo={this.props.productInfo} questionInfo={this.props.questionInfo} answer={answer} key={i}/>) : null }
        {this.state.showCount < this.props.answers.length && <Button onClick={this.handleMoreButton}>More Answers</Button>}
      </div>
    );
  }
}

export default AnswersList;
