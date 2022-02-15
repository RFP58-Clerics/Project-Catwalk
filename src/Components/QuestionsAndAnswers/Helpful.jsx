import React from 'react';

class Helpful extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0
    }
  }

  //need to handleClick to get only unique click per user

  render() {
    return (
      <div className='helpful-button'>
        <button onClick={() => this.setState({yes: this.state.clicks++})}>Helpful? Yes</button>
        {this.state.clicks}
      </div>
    )
  }
}

export default Helpful;