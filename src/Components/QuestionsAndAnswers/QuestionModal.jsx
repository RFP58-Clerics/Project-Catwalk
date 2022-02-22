import React from 'react';
import axios from 'axios';

class QuestionModal extends React.Component {
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
    const obj = {
      body: this.state.body,
      name: this.state.name,
      email: this.state.email,
      product_id: this.props.productInfo.id,
    };
    axios.post('/qa/questions', obj)
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
    // console.log('pID: ', this.props.productInfo.id)
    return (
      <div className="modal-background">
        <div className="modal-container">
          <button className="modalCloseBtn" onClick={() => { this.props.closeModal() }}> X </button>
          <div className='title'>
            <h1> Ask Your Question </h1>
            <h4> About the {this.props.productInfo.name}</h4>
          </div>
          <div className="body">
            <form onSubmit={this.handleSubmit}>
              <label>* Your Question</label>
              <br></br>
              <textarea
                name="body"
                type="textarea"
                maxLength="1000"
                required
                autoComplete="off"
                placeholder="Question..."
                value={this.state.body}
                onChange={this.handleChange}>
              </textarea>
              <br></br>
              <br></br>
              <label>* What is your nickname</label>
              <br></br>
              <input
                name="name"
                type="text"
                maxLength="60"
                required
                autoComplete="off"
                placeholder="Example: jackson11!"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <br></br>
              For privacy reasons, do not use your full name or email address
              <br></br>
              <br></br>
              <label>* Your email</label>
              <br></br>
              <input
                name="email"
                type="email"
                maxLength="60"
                required
                autoComplete="off"
                placeholder="Email: example@gmail.com"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <br></br>
              For authentication reasons, you will not be emailed
              <br></br>
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

export default QuestionModal;
