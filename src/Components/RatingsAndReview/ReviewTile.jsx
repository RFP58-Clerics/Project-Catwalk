/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewPhotos from './ReviewPhotos.jsx';
import './reviewstyles.css';

const Button = styled.button`
  background: #2b2b2b;
  color: white;
  font-size: 12px;
  padding: 5px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  border-radius: 0.25rem;
`;

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    const { review } = this.props;
    this.state = {
      helpfulness: review.helpfulness,
      disableHelpButton: false,
      expanded: false,
    };
    this.updateHelpfulness = this.updateHelpfulness.bind(this);
    this.updateReported = this.updateReported.bind(this);
    this.updateExpanded = this.updateExpanded.bind(this);
  }

  updateHelpfulness() {
    const { review } = this.props;
    axios({
      method: 'put',
      url: `/reviews/${review.review_id}/helpful`,
    })
      .then(() => {
        this.setState((oldState) => ({
          helpfulness: oldState.helpfulness + 1,
          disableHelpButton: true,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateReported() {
    const { review } = this.props;
    axios({
      method: 'put',
      url: `/reviews/${review.review_id}/reported`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateExpanded() {
    this.setState({
      expanded: true,
    });
  }

  render() {
    const { review } = this.props;
    const { expanded, disableHelpButton, helpfulness } = this.state;
    const reviewRating = [];
    for (let i = 0; i < review.rating; i += 1) {
      reviewRating.push('★');
    }

    let shortBody;

    if (review.body.length > 250) {
      shortBody = review.body.substring(0, 250);
    }

    return (
      <div className="reviewCard">
        <h4>{review.summary}</h4>
        <div>
          {reviewRating}
          {review.rating}
        </div>
        stars
        <br />
        {new Date(review.date).toDateString()}
        <br />
        {review.reviewer_name ? `✔(verifieduser)${review.reviewer_name}` : null}
        <br />
        {!expanded && shortBody && (
          <p>
            {shortBody}
            <button className="moreBtn" type="button" onClick={this.updateExpanded}>(more)</button>
          </p>
        )}
        {(expanded || !shortBody) && review.body}
        <br />
        {review.response ? `Response from seller: ${review.response}` : null}
        {review.recommend ? 'recommended ✔' : null}
        <br />
        {review.photos
          ? <ReviewPhotos photos={review.photos} />
          : <div />}
        <br />
        Was this review helpful?
        <div>
          <Button disabled={disableHelpButton} onClick={this.updateHelpfulness}>
            Yes
          </Button>
          &nbsp;
          {helpfulness}
        </div>
      </div>
    );
  }
}

export default ReviewTile;
