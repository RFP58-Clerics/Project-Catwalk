import React from 'react';
import axios from 'axios';
import ReviewPhotos from './ReviewPhotos.jsx';
import ReactDom from 'react-dom';

function StarPicker({description, name, onChange, value}) {
  return (
    <>
      {name && <div className="rightAlign">{name}</div> }
      <div className="starPicker">
        {
          [1, 2, 3, 4, 5].map((i) => (
            <label key={i} htmlFor={`${name}StarPicker${i}`} className="star">
              {(value && value >= i) ? '★' : '☆'}
              <input
                id={`${name}StarPicker${i}`}
                type="radio"
                value={i}
                checked={value === i}
                name={name}
                onChange={onChange}
                required
              />
            </label>
          ))
        }
      </div>
      <div>{description}</div>
    </>
  );
}

class NewReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: null,
      recommend: false,
      Size: null,
      Width: null,
      Comfort: null,
      Quality: null,
      Length: null,
      Fit: null,
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
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.closeClicked = this.closeClicked.bind(this);
  }

  onFieldChange(event, fieldName) {
    const newState = {};
    newState[fieldName] = parseInt(event.target.value, 10);
    this.setState(newState);
  }

  onFormChange(event, formName) {
    event.preventDefault();
    this.setState({
      [formName]: event.target.value,
    });
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

  closeClicked(event) {
    event.preventDefault();
    this.setState({
      rating: null,
      recommend: false,
      Size: null,
      Width: null,
      Comfort: null,
      Quality: null,
      Length: null,
      Fit: null,
      summary: '',
      body: '',
      photos: [],
      nickname: '',
      email: '',
      modalOpened: false,
    });
  }

  uploadPhoto(event) {
    event.preventDefault();
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('upload_preset', 'catwalk');
    data.append('cloud_name', 'dgdqzfkbf');

    axios({
      method: 'post',
      url: 'https://api.cloudinary.com/v1_1/dgdqzfkbf/image/upload',
      data,
    })
      .then((res) => {
        const { data: imageData } = res;
        this.setState((oldState) => ({
          photos: [...oldState.photos, imageData.url],
        }));
      })
      .catch((err) => console.log(err));
  }

  submitReview(event) {
    event.preventDefault();

    const {
      product,
      getReviews,
      characteristics,
    } = this.props;

    const {
      rating,
      summary,
      body,
      recommend,
      nickname,
      email,
      photos,
    } = this.state;

    const reviewData = {
      product_id: product.id,
      rating,
      summary,
      body,
      recommend,
      name: nickname,
      email,
      photos,
      characteristics: {},
    };

    Object.keys(characteristics).forEach((key) => {
      if (this.state[key] !== null) {
        reviewData.characteristics[characteristics[key].id] = this.state[key];
      }
    });

    axios({
      method: 'post',
      url: '/reviews',
      data: reviewData,
    })
      .then(() => {
        getReviews(product.id);
      })
      .then(() => {
        this.setState({
          modalOpened: false,
          rating: null,
          recommend: false,
          Size: null,
          Width: null,
          Comfort: null,
          Quality: null,
          Length: null,
          Fit: null,
          summary: '',
          body: '',
          photos: [],
          nickname: '',
          email: '',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      modalOpened,
      Size,
      Width,
      Comfort,
      Quality,
      Length,
      Fit,
      rating,
      photos,
    } = this.state;

    const {
      product,
      characteristics,
    } = this.props;

    const starRatings = {
      Size, Width, Comfort, Quality, Length, Fit, rating,
    };

    const descriptions = {
      rating: ['Poor', 'Fair', 'Average', 'Good', 'Great'],
      Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
      Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
      Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
      Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
      Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
      Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
    };

    if (!modalOpened) {
      return (
        <button type="button" onClick={this.modalClicked}>
          Leave a Review
        </button>
      );
    }
    return ReactDom.createPortal(
      <div className="newReviewModalBackground">
        <div className="newReviewModalContainer">
          <div className="right">
            <button type="button" onClick={this.closeClicked}>Close</button>
          </div>
          <h4>Write Your Review</h4>
          <h5>About the {product.name}</h5>
          <form onSubmit={this.submitReview}>
            <p>
              Overall Rating*
              <StarPicker onChange={(event) => this.onFieldChange(event, 'rating')} value={starRatings.rating} description={descriptions.rating[starRatings.rating - 1]} />
            </p>
            <p>
              Do you recommend this product?*
              <input type="radio" id="true" name="recommend" />
              <label htmlFor="true">Yes, I do.</label>

              <input type="radio" id="false" name="recommend" />
              <label htmlFor="false">No, I do not.</label>
            </p>
            <p>Characteristics*</p>
            <div className="twoColumn">
              {

                // ['size', 'width', 'comfort', 'quality', 'length', 'fit'].map((name) => (
                Object.keys(characteristics).map((name) => (
                  <StarPicker
                    key={name}
                    description={descriptions[name][starRatings[name] - 1]}
                    name={name}
                    onChange={(event) => this.onFieldChange(event, name)}
                    value={starRatings[name]}
                  />
                ))
              }
            </div>
            <p>Review Summary</p>
            <input type="text" maxLength="60" placeholder="Example: Best purchase ever!" onChange={(event) => this.onFormChange(event, 'summary')} />
            <p>Review Body*</p>
            <textarea type="text" minLength="50" maxLength="1000" placeholder="Why did you like the product or not?" onChange={(event) => this.onFormChange(event, 'body')} required style={{ resize: 'none', width: '100%', height: '5em' }} />
            <p>
              <span>Upload photos: </span>
              {photos.length < 5
                ? <input type="file" onChange={this.uploadPhoto} placeholder="photos" /> : 'Maximum upload met'}
              <ReviewPhotos photos={photos} />
            </p>
            <p className="fourCol">
              <label className="required" htmlFor="nickname">
                <span>Nickname</span>
                <input type="text" id="nickname" maxLength="60" placeholder="Example: jackson11!" onChange={(event) => this.onFormChange(event, 'nickname')} required />
              </label>
              <label className="required" htmlFor="email">
                <span>Email</span>
                <input type="email" maxLength="60" placeholder="Example: jackson11@email.com" onChange={(event) => this.onFormChange(event, 'email')} required />
              </label>
            </p>
            <p>
              <input type="submit" value="submit Review" />
            </p>
          </form>
        </div>
      </div>,
      document.getElementById('new-review'),
    );
  }
}

export default NewReviewForm;
