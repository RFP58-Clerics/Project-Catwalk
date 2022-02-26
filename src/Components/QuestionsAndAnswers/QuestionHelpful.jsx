/* eslint-disable max-len */
import React from 'react';
import axios from 'axios';
import './styles.css';
import styled from 'styled-components';

const Button = styled.button`
  background: #2b2b2b;
  color: white;
  font-size: 12px;
  padding: 5px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  border-radius: 0.25rem;
`;

class QuestionHelpful extends React.Component {
  constructor(props) {
    super(props);
    const { questionInfo } = this.props;
    this.state = {
      helpfulness: questionInfo.question_helpfulness,
      buttonDisable: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { questionInfo } = this.props;
    if (questionInfo && questionInfo.question_id !== prevProps.questionInfo.question_id) {
      this.setState({ helpfulness: questionInfo.question_helpfulness });
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
    const { buttonDisable, helpfulness } = this.state;
    const { questionInfo } = this.props;
    return (
      <div className="helpful-button">
        Helpful?
        &nbsp;
        <div>
          <Button disabled={buttonDisable} onClick={() => { this.handleClick(questionInfo.question_id) }}> Yes </Button>
          &nbsp;
          {helpfulness}
        </div>
      </div>
    );
  }
}

export default QuestionHelpful;
