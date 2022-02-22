/* eslint-disable max-len */
import React from 'react';
import axios from 'axios';
import './styles.css';

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
        <button disabled={this.state.buttonDisable} onClick={() => { this.handleClick(this.props.questionInfo.question_id) }}> Yes </button>
        {this.state.helpfulness}
      </div>
    );
  }
}

export default QuestionHelpful;
