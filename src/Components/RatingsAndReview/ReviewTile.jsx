import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
// import dateFormat from 'dateformat';
import ReviewPhotos from './ReviewPhotos.jsx';
import './reviewstyles.css';

const Button = styled.button`
  background: #2b2b2b;
  color: white;
  font-size: 12px;
  padding: 12px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
`;

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helpfulness: this.props.review.helpfulness,
      disableHelpButton: false,
      expanded: false,
    };
    this.updateHelpfulness = this.updateHelpfulness.bind(this);
    this.updateReported = this.updateReported.bind(this);
    this.updateExpanded = this.updateExpanded.bind(this);
  }

  updateHelpfulness() {
    axios({
      method: 'put',
      url: `/reviews/${this.props.review.review_id}/helpful`,
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
    axios({
      method: 'put',
      url: `/reviews/${this.props.review.review_id}/reported`,
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
    const {
      summary, rating, date, body, photos,
      helpfulness, reviewer_name, recommend, response
    } = this.props.review;
    let reviewRating = [];
    for (let i = 0; i < rating; i += 1) {
      reviewRating.push('★');
    }

    // let outputDate = dateFormat(new Date(date), 'mmmm d, yyyy');

    let shortBody;

    if (body.length > 250) {
      shortBody = body.substring(0, 250);
    }

    return (
      <div className="reviewCard">
        <h4>{summary}</h4>
        <div>
          {reviewRating}
          {rating}
        </div>
        stars
        <br />
        {/* {outputDate} */}
        {new Date(date).toDateString()}
        <br />
        {reviewer_name ? `✔(verifieduser)${reviewer_name}` : null}
        <br />
        {!this.state.expanded && shortBody && (
          <p>
            {shortBody}
            <button className="moreBtn" type="button" onClick={this.updateExpanded}>(more)</button>
          </p>
        )}
        {(this.state.expanded || !shortBody) && body}
        <br />
        {response ? `Response from seller: ${response}` : null}
        {recommend ? 'recommended ✔' : null}
        <br />
        {photos
          ? <ReviewPhotos photos={photos} />
          : <div />}
        <br />
        Was this review helpful?
        <div>
          <Button disabled={this.state.disableHelpButton} onClick={this.updateHelpfulness}>
            Yes
          </Button>
          {this.state.helpfulness}
        </div>
        {/* <Button>No</Button>
        <Button onClick={this.updateReported}>Report</Button> */}
      </div>
    );
  }
}

export default ReviewTile;
