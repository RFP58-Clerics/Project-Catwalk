import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const searchedWord = event.target.value;
    this.setState({
      input: searchedWord,
    });

    let newFilter = [];
    if (searchedWord.length >= 3) {
      newFilter = this.props.copiedQuestions.filter((question) => (
        question.question_body.toLowerCase().includes(searchedWord.toLowerCase())
      ));
      this.props.handleSearch(newFilter);
    } else {
      this.props.handleSearch(this.props.copiedQuestions);
    }
  }

  render() {
    return (
      <form className="searchQuestion">
        <input className="searchQuestionInput" type="text" placeholder="Have a question? Search for answers." value={this.state.input} onChange={this.handleChange} />
        <input className="searchButton" type="submit" value="Search" />
      </form>
    );
  }
}

export default Search;
