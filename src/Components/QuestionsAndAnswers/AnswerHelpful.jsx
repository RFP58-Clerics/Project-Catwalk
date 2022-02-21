import React from 'react';
import axios from 'axios';
import './styles.css';

class AnswerHelpful extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: this.props.answerInfo.helpfulness,
      buttonDisable: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.answerInfo && this.props.answerInfo.answer_id !== prevProps.answerInfo.answer_id) {
      this.setState({helpfulness: this.props.answerInfo.helpfulness});
    }
  }

  handleClick(answerId) {
    axios.put(`/qa/answers/${answerId}/helpful`)
    .then(() => {
      this.setState((oldState) => ({
        helpfulness: oldState.helpfulness + 1,
        buttonDisable: true,
      }));
    })
  }

  render() {
    console.log("answers: ", this.props.answerInfo)
    return (
      <div className="helpful-button">
        Helpful?
        <button disabled={this.state.buttonDisable} onClick={() => {this.handleClick(this.props.answerInfo.answer_id)}}> Yes </button>
        {this.state.helpfulness}
      </div>
    );
  }
}

export default AnswerHelpful;
