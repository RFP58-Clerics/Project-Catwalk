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
      photos: [],
    };
    this.getAnswers = this.getAnswers.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {questionInfo} = this.props;
    this.getAnswers(questionInfo.question_id);
  }

  componentDidUpdate(prevProps) {
    const {questionInfo} = this.props;
    if (questionInfo && questionInfo.question_id !== prevProps.questionInfo.question_id) {
      this.getAnswers(questionInfo.question_id);
    }
  }

  handleSubmit(photos) {
    this.setState({photos});
  }

  getAnswers(questionId) {
    axios.get(`/qa/questions/${questionId}/answers`)
      .then((res) => {
        res.data.sort((a, b) => b.helpfulness - a.helpfulness);
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
    const { productInfo, questionInfo, getQuestions } = this.props;
    const { a, openModal } = this.state;
    return (
      <div>
        <div className="qa-set">
          <QuestionHelpful productInfo={productInfo} questionInfo={questionInfo} getQuestions={getQuestions} />
          <span className="questionBody">
            Q:
            {' '}
            {questionInfo.question_body}
            {Object.values(a).length === 0 ? null : (<AnswersList productInfo={productInfo} questionInfo={questionInfo} answers={a || null} />)}
          </span>
        </div>
        <button className="openModalButton" onClick={() => { this.setState({ openModal: true }) }}>Submit Answer</button>
        <br />
        {openModal && <AnswerModal productInfo={productInfo} questionInfo={questionInfo} closeModal={this.closeModal} getAnswers={this.getAnswers} handleSubmit={this.handleSubmit} />}
        <br />
      </div>
    );
  }
}

export default QuestionsListItem;
