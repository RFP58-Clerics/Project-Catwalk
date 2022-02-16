import React from 'react';
import axios from 'axios';
import Search from './Search.jsx';
import QuestionsList from './QuestionsList.jsx';
import QuestionsListItem from './QuestionsListItem.jsx';
import QuestionModal from './QuestionModal.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: [],
      a: [],
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  // componentDidMount() {
  //   this.getQuestions(this.props.product.id);
  // }

  componentDidMount() {
    axios.all([
      axios.get('/qa/questions/40347'),
      axios.get('/qa/questions/329021/answers')
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

  render() {
    return (
      <div className="qa-box">
        <h3>Questions & Answers</h3>
        <Search className="search" product={this.props.product} getQuestions={this.getQuestions} />
        <QuestionsList questions={this.state.q} />
        <button className='openModalButton'>Submit Question</button>
        <QuestionModal productId={this.props.product.id}/>
      </div>
    );
  }
}

export default QuestionsAndAnswers;
