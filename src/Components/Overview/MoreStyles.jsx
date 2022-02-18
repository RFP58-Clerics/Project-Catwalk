import React from 'react';

class MoreStyles extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.changeStyle(this.props.style);
  }

  render() {
    return(
      <img className={'more-styles'} src={this.props.style.photos[0].thumbnail_url} onClick={this.handleClick}></img>
    );
  }
}

export default MoreStyles;
