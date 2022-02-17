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
    Object.values(this.state.a).length === 0 ? null : (
      <div>
        <br></br>
        Q: {this.props.questionInfo.question_body}
        <Helpful />
        <button className="openModalButton" onClick={() => {this.setState({openModal: true})}}>Submit Answer</button>
        {this.state.openModal && <AnswerModal productInfo={this.props.productInfo} questionInfo={this.props.questionInfo} closeModal={this.closeModal}/>}
        <AnswersList answers={this.state.a || null}/>
        <br></br>
      </div>
    )
  )}
}

export default QuestionsListItem;
