/* eslint-disable max-len */
import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import QuestionsList from './QuestionsList.jsx';
import QuestionModal from './QuestionModal.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: [],
      openModal: false,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    if (this.props.product) {
      this.getQuestions(this.props.product.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.product && this.props.product.id !== prevProps.product.id) {
      this.getQuestions(this.props.product.id);
    }
  }

  handleSearch(id, input) {
    axios.get(`/qa/questions/${id}`)
      .then((res) => {
        const searched = [];
        res.data.forEach((question) => {
          if (question.question_body.includes(input)) {
            searched.push(question);
          }
        });
        this.setState({ q: searched });
      });
  }

  getQuestions(id) {
    axios.get(`/qa/questions/${id}`)
      .then((res) => {
        this.setState({
          q: res.data,
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
    return (
      <div className="qa-box">
        <h3>Questions & Answers</h3>
        <Search className="search" productInfo={this.props.product} handleSearch={this.handleSearch} />
        <br />
        <QuestionsList productInfo={this.props.product} questions={this.state.q} getQuestions={this.getQuestions} />
        <br />
        <button className='openModalButton' onClick={() => this.setState({ openModal: true })}>Submit Question</button>
        {this.state.openModal && <QuestionModal productInfo={this.props.product} closeModal={this.closeModal} />}
      </div>
    );
  }
}

export default QuestionsAndAnswers;
