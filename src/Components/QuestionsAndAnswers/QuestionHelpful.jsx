/* eslint-disable max-len */
import React from 'react';
import axios from 'axios';
import './styles.css';
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

class QuestionHelpful extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: this.props.questionInfo.question_helpfulness,
      buttonDisable: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.questionInfo && this.props.questionInfo.question_id !== prevProps.questionInfo.question_id) {
      this.setState({ helpfulness: this.props.questionInfo.question_helpfulness });
    }
  }

  handleClick(questionId) {
    axios.put(`/qa/questions/${questionId}/helpful`)
      .then(() => {
        this.setState((oldState) => ({
          helpfulness: oldState.helpfulness + 1,
          buttonDisable: true,
        }));
      });
  }

  render() {
    return (
      <div className="helpful-button">
        Helpful?
        <div>
        <Button disabled={this.state.buttonDisable} onClick={() => { this.handleClick(this.props.questionInfo.question_id) }}> Yes </Button>
        {this.state.helpfulness}
        </div>
      </div>
    );
  }
}

export default QuestionHelpful;
