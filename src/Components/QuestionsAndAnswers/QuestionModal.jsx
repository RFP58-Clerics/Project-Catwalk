import React from 'react';
import axios from 'axios';
import ReactDom from 'react-dom';
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
    const { body, name, email, product_id } = this.state;
    // const obj = {
    //   body: this.state.body,
    //   name: this.state.name,
    //   email: this.state.email,
    //   product_id: this.props.productInfo.id,
    // };
    const { getQuestions, productInfo } = this.props;
    axios.post('/qa/questions', { body, name, email, product_id })
      .then(() => {
        getQuestions(productInfo.id);
      })
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
    const { closeModal, productInfo } = this.props;
    const { body, name, email } = this.state;
    return ReactDom.createPortal(
      <div className="modal-background">
        <div className="modal-container">
          <Button className="modalCloseBtn" onClick={() => { closeModal(); }}> Close </Button>
          <div className='title'>
            <h4> Ask Your Question </h4>
            <h5> About the {productInfo.name}</h5>
          </div>
          <div className="body">
            <form onSubmit={this.handleSubmit}>
              <label>* Your Question</label>
              <br />
              <textarea
                name="body"
                type="textarea"
                maxLength="1000"
                required
                autoComplete="off"
                placeholder="Question..."
                value={body}
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
                placeholder="Example: jackson11!"
                value={name}
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
                placeholder="Email: example@gmail.com"
                value={email}
                onChange={this.handleChange}
              />
              <br />
              For authentication reasons, you will not be emailed
              <br />
              <br />
              <input className="searchButton"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>,
      document.getElementById('qa-portal'),
    );
  }
}

export default QuestionModal;
