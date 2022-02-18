import React from 'react';

class ProductStyles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnail: this.props.photo.thumbnail_url,
      url: this.props.photo.url,

    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.changePhoto(this.state.url);
  }

  render() {
    return (
        <img className='styleThumbnail' src={this.state.thumbnail} onClick={this.handleClick} />
    );
  }
}

export default ProductStyles;
