/* eslint-disable max-len */
import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import QuestionsList from './QuestionsList.jsx';
import QuestionModal from './QuestionModal.jsx';
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

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: [],
      openModal: false,
      copiedQuestions: [],
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const { product } = this.props;
    if (product) {
      this.getQuestions(product.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { product } = this.props;
    if (product && product.id !== prevProps.product.id) {
      this.getQuestions(product.id);
    }
  }

  handleSearch(filteredQuestions) {
    this.setState({ q: filteredQuestions });
  }

  getQuestions(id) {
    axios.get(`/qa/questions/${id}`)
      .then((res) => {
        res.data.sort((a, b) => b.helpfulness - a.helpfulness);
        this.setState({
          q: res.data,
          copiedQuestions: res.data,
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
    const { product } = this.props;
    const { q, copiedQuestions, openModal } = this.state;
    return (
      <div className="qa-container">
        <div className="qa-box">
          <h3 className="qaHeader">Questions & Answers</h3>
          <div className="searchAndQuestions">
            <Search className="search" productInfo={product} questions={q} copiedQuestions={copiedQuestions} handleSearch={this.handleSearch} getQuestions={this.getQuestions}/>
            <br />
            <QuestionsList productInfo={product} questions={q} getQuestions={this.getQuestions} />
            <br />
            <Button className='openModalButton' onClick={() => this.setState({ openModal: true })}>Submit Question</Button>
            {openModal && <QuestionModal productInfo={product} closeModal={this.closeModal} getQuestions={this.getQuestions} />}
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionsAndAnswers;
