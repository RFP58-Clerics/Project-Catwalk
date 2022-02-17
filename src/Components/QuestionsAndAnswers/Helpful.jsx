import React from 'react';
import axios from 'axios';
import './styles.css';

class Helpful extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: this.props.questionInfo.question_helpfulness,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // componentDidMount() {
  //   this.handleClick(this.props.questionInfo.question_id)
  // }

  handleClick(questionId) {
    axios.put(`/qa/questions/${questionId}/helpful`)
    .then(() => {
      this.setState((oldState) => {
        helpfulness: oldState.helpfulness + 1
      })
    })
  }


  render() {
    console.log('quesitonId: ', this.props.questionInfo.question_id)
    return (
      <div className="helpful-button">
        Helpful?
        <button onClick={this.handleClick(this.props.questionInfo.question_id)}>Yes</button>
        {this.state.helpfulness}
      </div>
    );
  }
}

export default Helpful;
