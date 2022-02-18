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
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    if (this.props.product) {
      this.getQuestions(40347);
    }
  }

  // componentDidMount() {
  //   axios.all([
  //     axios.get('/qa/questions/40347'),
  //     // axios.get('/qa/questions/product_id'),
  //     // axios.get('/qa/questions/question_id/answers')
  //   ])
  //     .then(axios.spread((q, a) => {
  //       this.setState({
  //         q: q.data,
  //       });
  //     }));
  // }

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
        <Search className="search" productInfo={this.props.product} getQuestions={this.getQuestions} />
        <QuestionsList productInfo={this.props.product} questions={this.state.q} getQuestions={this.getQuestions}/>
        <button className='openModalButton'onClick={() => this.setState({openModal: true})}>Submit Question</button>
        {this.state.openModal && <QuestionModal productInfo={this.props.product} closeModal={this.closeModal}/>}
      </div>
    );
  }
}

export default QuestionsAndAnswers;
