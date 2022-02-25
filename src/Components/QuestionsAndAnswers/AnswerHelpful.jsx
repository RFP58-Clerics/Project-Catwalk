/* eslint-disable max-len */
import React from 'react';
// import PropTypes from 'prop-types';
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
      this.setState({ helpfulness: this.props.answerInfo.helpfulness });
    }
  }

  handleClick(answerId) {
    axios.put(`/qa/answers/${answerId}/helpful`)
      .then(() => {
        this.setState((oldState) => ({
          helpfulness: oldState.helpfulness + 1,
          buttonDisable: true,
        }));
      });
  }

  render() {
    return (
      <div className="helpful">
        Helpful?
        <Button disabled={this.state.buttonDisable} onClick={() => { this.handleClick(this.props.answerInfo.answer_id) }}> Yes </Button>
        {this.state.helpfulness}
      </div>
    );
  }
}

// AnswerHelpful.propTypes = {
//   helpfulness: PropTypes.string,
// };

export default AnswerHelpful;
