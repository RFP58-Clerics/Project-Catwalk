import React from 'react';
import axios from 'axios';
import Helpful from './Helpful.jsx';
import AnswerModal from './AnswerModal.jsx';
import AnswersList from './AnswersList.jsx';

class QuestionsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: {},
      openModal: false,
    }
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
          a: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  closeModal(){
    this.setState({ openModal: false});
  }

  render() {
  return (
      <div>
        <div className="questionBody">
          <Helpful productInfo={this.props.productInfo} questionInfo={this.props.questionInfo} getQuestions={this.props.getQuestions}/>
          <span className="question">
            Question: {this.props.questionInfo.question_body}
           {Object.values(this.state.a).length === 0 ? null : (<AnswersList answers={this.state.a || null}/> )}
           </span>
        </div>
          <button className="openModalButton" onClick={() => {this.setState({openModal: true})}}>Submit Answer</button>
          <br></br>
        {this.state.openModal && <AnswerModal productInfo={this.props.productInfo} questionInfo={this.props.questionInfo} closeModal={this.closeModal}/>}
        <br></br>
      </div>
  )}
}

export default QuestionsListItem;
