import React from 'react';
import axios from 'axios';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      answerer_name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const obj = {
      body: this.state.body,
      answerer_name: this.state.answerer_name,
    };
    axios.post(`/qa/questions/${this.props.questionInfo.question_id}/answers`, obj)
      .then((res) => {
        console.log(res);
        this.setState({
          body: '',
          answerer_name: '',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="modal-background">
        <div className="modal-container">
          <button onClick={() => { this.props.closeModal() }}> X </button>
          <div className='title'>
            <h1> Submit Your Answer </h1>
            <h3> {this.props.productInfo.name} : {this.props.questionInfo.question_body}</h3>
          </div>
          <div className="body">
            <form onSubmit={this.handleSubmit}>
              <input
                name="body"
                type="text"
                autoComplete="off"
                placeholder="Answer..."
                value={this.state.body}
                onChange={this.handleChange}
              />
              <br></br>
              <input
                name="name"
                type="text"
                autoComplete="off"
                placeholder="Example: jack543!"
                value={this.state.answerer_name}
                onChange={this.handleChange}
              />
              <br></br>
              For privacy reasons, do not use your full name or email address
              <br></br>
              <input
                name="email"
                type="text"
                autoComplete="off"
                placeholder="Example: jack@email.com"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <br></br>
              For authentication reasons, you will not be emailed” will appear
              <br></br>
              <input
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AnswerModal;
