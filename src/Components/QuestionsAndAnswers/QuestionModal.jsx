import React from 'react';
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
    let obj = {
      body: this.state.body,
      name: this.state.name,
      email: this.state.email,
      product_id: this.props.productId,
    }
    axios.post(`/qa/questions`, obj)
      .then(res => {
        console.log(res);
        this.setState({
          body: '',
          name: '',
          email: '',
        })
      })
        .catch(err => {
          console.log(err);
        })
  }


  render() {
    return (
      <div className='modal-background'>
        <div className='modal-container'>
          <button onClick={() => {this.props.closeModal()}}> X </button>
          <div className='title'>
            <h1> Submit Your Question </h1>
          </div>
          <div className='body'>
            <form onSubmit={this.handleSubmit}>
              <input
                name='body'
                type='text'
                autoComplete="off"
                placeholder='Question...'
                value={this.state.body}
                onChange={this.handleChange}
              />
            <input
                name='name'
                type='text'
                autoComplete="off"
                placeholder='Name'
                value={this.state.name}
                onChange={this.handleChange}
              />
              <input
                name= 'email'
                type='text'
                autoComplete="off"
                placeholder='Email: example@gmail.com'
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
