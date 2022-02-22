import React from 'react';
import AnswersListItem from './AnswersListItem.jsx';

class AnswersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCount: 2,
    };
    this.handleMoreButton = this.handleMoreButton.bind(this);
  }

  handleMoreButton() {
    this.setState((oldState) => ({
      showCount: oldState.showCount + 2,
    }));
  }

  render() {
    console.log('answers: ', this.props.answers)
    const answers = this.props.answers.slice(0, this.state.showCount);
    return (
      <div>
        {answers ? Object.values(answers).map((answer, i) => <AnswersListItem answer={answer} key={i}/>) : null }
        {this.state.showCount < this.props.answers.length && <button onClick={this.handleMoreButton}>More Answers</button>}
      </div>
    );
  }
}

export default AnswersList;
