import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.getQuestions(this.props.productInfo.id);
  }

  render() {
    return (
      <form className="searchQuestion" onSubmit={this.handleSubmit}>
        <input type='text' placeholder='Have a question? Search for answers.' value={this.state.input} onChange={this.handleChange}/>
        <input type='submit' value='Search'/>
      </form>
    )
  }
}

export default Search;