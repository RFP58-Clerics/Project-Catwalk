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
      a: []
    }
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions(this.props.product.id);
  }

  getQuestions(id) {
    axios.get(`/qa/questions/${id}`)
      .then((res) => {
        this.setState({
          q: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // need to write getAnswers method on client and server
  // getAnswers(id) {
  //   axios.get(`/qa/questions/${id}`)
  //     .then((res) => {
  //       this.setState({
  //         q: res.data
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  render() {
    return (
      <div>
        <h3>Questions & Answers</h3>
        <Search product={this.props.product} getQuestions={this.getQuestions}/>
        <QuestionsList questions={this.state.q}/>
        <QuestionsListItem />
        {/* <AnswersList answers={this.state.a}/> */}
      </div>
    )
  }
}

export default QuestionsAndAnswers;