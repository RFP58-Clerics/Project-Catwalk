import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import QuestionsList from './QuestionsList.jsx';
import QuestionsListItem from './QuestionsListItem.jsx';
import AnswersList from './AnswersList.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: [],
      a: [],
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
  }

  // componentDidMount() {
  //   this.getQuestions(this.props.product.id);
  // }

  componentDidMount() {
    axios.all([
      axios.get('/qa/questions/40344'),
      axios.get('/qa/questions/563336/answers')
      // axios.get('/qa/questions/product_id'),
      // axios.get('/qa/questions/question_id/answers')
    ])
      .then(axios.spread((q, a) => {
        this.setState({
          q: q.data,
          a: a.data
        });
      }));
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

  getAnswers(questionId) {
    axios.get(`/qa/questions/${questionId}/answer`)
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
      <div className="qa-box">
        <h3>Questions & Answers</h3>
        <Search className="search" product={this.props.product} getQuestions={this.getQuestions} />
        <QuestionsList questions={this.state.q}/>
        <AnswersList answers={this.state.a}/>
      </div>
    );
  }
}

export default QuestionsAndAnswers;
