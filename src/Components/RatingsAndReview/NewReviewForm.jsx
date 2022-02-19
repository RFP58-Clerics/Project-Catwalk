import React from 'react';
import axios from 'axios';

function StarPicker({name, onChange, value}) {
  return (
    <div className="starPicker">
      {name[0].toUpperCase() + name.substring(1)}
      {
        [1, 2, 3, 4, 5].map((i) => (
          <label htmlFor={`${name}StarPicker${i}`} className="star">
            {(value && value >= i) ? '★' : '☆'}
            <input
              id={`${name}StarPicker${i}`}
              type="radio"
              value={i}
              checked={value === i}
              name={name}
              onChange={onChange}
            />
          </label>
        ))
      }
    </div>
  );
}

class NewReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: null,
      recommend: false,
      size: null,
      width: null,
      comfort: null,
      quality: null,
      length: null,
      fit: null,
      summary: '',
      body: '',
      photos: [],
      nickname: '',
      email: '',
      modalOpened: false,
    };

    this.modalClicked = this.modalClicked.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange(event, fieldName) {
    const newState = {};
    newState[fieldName] = parseInt(event.target.value, 10);
    this.setState(newState);
  }

  // componentDidMount() {
  //   this.
  // }

  modalClicked(event) {
    event.preventDefault();
    this.setState({
      modalOpened: true,
    });
  }

  submitReview(event) {
    event.preventDefault();
    axios({
      method: 'post',
      url: `/reviews`,
      body: {
        product_id: this.props.productId,
        rating: this.state.rating,
        summary: this.state.summary,
        body: this.state.body,
        recommend: this.state.recommend,
        name: this.state.nickname,
        email: this.state.email,
        photos: this.state.photos,
        characteristics: this.state.characteristics,
      },
    })
      .then(() => {
        this.props.getReviews(this.props.productId);
      })
      .then(() => {
        this.setState({
          modalOpened: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      modalOpened,
      size,
      width,
      comfort,
      quality,
      length,
      fit,
    } = this.state;

    const starRatings = {
      size, width, comfort, quality, length, fit,
    };

    return (
      <div className="newReview">
        <button type="button" onClick={this.modalClicked}>
          Leave a Review
        </button>
        {modalOpened && (
          <form onSubmit={this.submitReview}>
            <input type="text" placeholder="starRating" />
            <input type="text" placeholder="recommend" />
            {
              ['size', 'width', 'comfort', 'quality', 'length', 'fit'].map((name) => (
                <StarPicker
                  name={name}
                  onChange={(event) => this.onFieldChange(event, name)}
                  value={starRatings[name]}
                />
              ))
            }
            <input type="text" placeholder="summary" />
            <input type="text" placeholder="body" />
            <input type="text" placeholder="photos" />
            <input type="text" placeholder="nickname" />
            <input type="text" placeholder="email" />
            <input type="submit" value="submit Review" />
          </form>
        )}
      </div>
    );
  }
}

export default NewReviewForm;
