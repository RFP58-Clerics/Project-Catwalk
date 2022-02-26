import React from 'react';
import axios from 'axios';
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

class AnswerReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Report',
      buttonDisable: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(answerId) {
    axios.put(`/qa/answers/${answerId}/report`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          text: 'Reported',
          buttonDisable: true,
        });
      });
  }

  render() {
    const { buttonDisable, text } = this.state;
    const { answerInfo } = this.props;
    return <Button disabled={buttonDisable} onClick={() => this.handleClick(answerInfo.answer_id)}> {text} </Button>
  }
}

export default AnswerReport;
