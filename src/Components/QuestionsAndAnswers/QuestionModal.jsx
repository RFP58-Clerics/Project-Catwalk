import React from 'react';
const moment= require('moment');
import axios from 'axios';

class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      name: '',
      email: '',
    }
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
    console.log('question got submitted');
    console.log('productId: ', this.props.productId);
    let obj = {
      body: this.state.body,
      name: this.state.name,
      email: this.state.email,
      product_id: this.props.productId,
    }
    axios.post(`/qa/questions`, obj)
      .then(res => {
        console.log(res);
      })
        .catch(err => {
          console.log(err);
        })
  }


  render() {
    return (
      <div className='modal-background'>
        <div className='modal-container'>
          <button> X </button>
          <div className='title'>
            <h1> Submit Your Question </h1>
          </div>
          <div className='body'>
            <form onSubmit={this.handleSubmit}>
            <input
                name='name'
                type='text'
                autoComplete="off"
                placeholder='Your name'
                value={this.state.name}
                onChange={this.handleChange}
              />
              <input
                name='body'
                type='text'
                autoComplete="off"
                placeholder='Question...'
                value={this.state.body}
                onChange={this.handleChange}
              />
              <input
                name='email'
                type='text'
                autoComplete="off"
                placeholder='Your email'
                value={this.state.email}
                onChange={this.handleChange}
              />
              <input
                type='submit'
                value='Submit'
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default QuestionModal;
