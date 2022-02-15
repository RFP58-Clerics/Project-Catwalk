import React from 'react';
import Search from './Search.jsx';
import axios from 'axios';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: [],
      a: []
    }
    this.getQuestions = this.getQuestions.bind(this);
  }

  // componentDidMount() {
  //   this.getQuestions(this.props.product.id);
  // }

  getQuestions(id) {
    axios.get(`/qa/questions/${id}`)
      .then((res) => {
        console.log('q&a then: ', res.data);
        this.setState({
          q: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h3>Questions & Answers</h3>
        <Search product={this.props.product} getQuestions={this.getQuestions}/>
      </div>
    )
  }
}

export default QuestionsAndAnswers;