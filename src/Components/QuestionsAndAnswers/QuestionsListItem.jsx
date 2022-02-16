import React from 'react';
import axios from 'axios';
import Helpful from './Helpful.jsx';
import AnswersList from './AnswersList.jsx';

class QuestionsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: {},
    }
    this.getAnswers = this.getAnswers.bind(this);
  }

  componentDidMount() {
    this.getAnswers(this.props.questionId);
  }

  getAnswers(questionId) {
    axios.get(`/qa/questions/${questionId}/answers`)
      .then((res) => {
        this.setState({
          a: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
  return (
    Object.values(this.state.a).length === 0 ? null : (
      <div>
        <br></br>
        Q: {this.props.questionBody}
        <Helpful />
        <AnswersList answers={this.state.a || null}/>
        <br></br>
      </div>
    )
  )
  }
}

export default QuestionsListItem;
