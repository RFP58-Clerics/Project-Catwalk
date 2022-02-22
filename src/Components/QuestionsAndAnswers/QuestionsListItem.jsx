/* eslint-disable max-len */
import React from 'react';
import axios from 'axios';
import QuestionHelpful from './QuestionHelpful.jsx';
import AnswerModal from './AnswerModal.jsx';
import AnswersList from './AnswersList.jsx';

class QuestionsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: {},
      openModal: false,
    };
    this.getAnswers = this.getAnswers.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.getAnswers(this.props.questionInfo.question_id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.questionInfo && this.props.questionInfo.question_id !== prevProps.questionInfo.question_id) {
      this.getAnswers(this.props.questionInfo.question_id);
    }
  }

  getAnswers(questionId) {
    axios.get(`/qa/questions/${questionId}/answers`)
      .then((res) => {
        this.setState({
          a: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  render() {
    console.log('productID: ', this.props.productInfo.name);
    console.log('questionID: ', this.props.questionInfo.question_id);
    console.log('questionBody: ', this.props.questionInfo.question_body);

    return (
      <div>
        <div className="qa-set">
          <QuestionHelpful productInfo={this.props.productInfo} questionInfo={this.props.questionInfo} getQuestions={this.props.getQuestions} />
          <span className="questionBody">
            Q: {this.props.questionInfo.question_body}
            {Object.values(this.state.a).length === 0 ? null : (<AnswersList answers={this.state.a || null} />)}
          </span>
        </div>
        <button className="openModalButton" onClick={() => { this.setState({ openModal: true }) }}>Submit Answer</button>
        <br />
        {this.state.openModal && <AnswerModal productInfo={this.props.productInfo} questionInfo={this.props.questionInfo} closeModal={this.closeModal} getAnswers={this.getAnswers} />}
        <br />
      </div>
    );
  }
}

export default QuestionsListItem;
