import React from 'react';
import axios from 'axios';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      name: '',
      email: '',
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
    console.log('questionID passed in: ', this.props.questionInfo.question_id);
    const obj = {
      body: this.state.body,
      name: this.state.name,
      email: this.state.email,
    };
    axios.post(`/qa/questions/${this.props.questionInfo.question_id}/answers`, obj)
      .then((res) => {
        console.log(res);
        this.setState({
          body: '',
          name: '',
          email: '',
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
          <button className="modalCloseBtn" onClick={() => { this.props.closeModal() }}> X </button>
          <div className='title'>
            <h1> Submit Your Answer </h1>
            <h3> {this.props.productInfo.name} : {this.props.questionInfo.question_body}</h3>
          </div>
          <div className="body">
            <form onSubmit={this.handleSubmit}>
              <label>* Your Answer</label>
              <br />
              <textarea
                name="body"
                type="text"
                maxLength="1000"
                required
                autoComplete="off"
                placeholder="Answer..."
                value={this.state.body}
                onChange={this.handleChange}
              />
              <br />
              <br />
              <label>* What is your nickname</label>
              <br />
              <input
                name="name"
                type="text"
                maxLength="60"
                required
                autoComplete="off"
                placeholder="Example: jack543!"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <br />
              For privacy reasons, do not use your full name or email address
              <br />
              <br />
              <label>* Your email</label>
              <br />
              <input
                name="email"
                type="email"
                maxLength="60"
                required
                autoComplete="off"
                placeholder="Example: jack@email.com"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <br />
              For authentication reasons, you will not be emailed” will appear
              <br />
              <br />
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
