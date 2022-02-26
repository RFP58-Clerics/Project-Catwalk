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
  padding: 5px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  border-radius: 0.25rem;
`;

class AnswerHelpful extends React.Component {
  constructor(props) {
    super(props);
    const { answerInfo } = this.props;
    this.state = {
      helpfulness: answerInfo.helpfulness,
      buttonDisable: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { answerInfo } = this.props;
    if (answerInfo && answerInfo.answer_id !== prevProps.answerInfo.answer_id) {
      this.setState({ helpfulness: answerInfo.helpfulness });
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
    const { buttonDisable, helpfulness } = this.state;
    const { answerInfo } = this.props;
    return (
      <div className="helpful">
        Helpful?
        &nbsp;
        <Button disabled={buttonDisable} onClick={() => { this.handleClick(answerInfo.answer_id); }}> Yes </Button>
        &nbsp;
        {helpfulness}
      </div>
    );
  }
}

// AnswerHelpful.propTypes = {
//   helpfulness: PropTypes.string,
// };

export default AnswerHelpful;
