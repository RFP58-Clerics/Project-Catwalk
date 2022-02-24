import React from 'react';
import axios from 'axios';
import ReactDom from 'react-dom';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      name: '',
      email: '',
      photos: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('questionID passed in: ', this.props.questionInfo.question_id);
    const obj = {
      body: this.state.body,
      name: this.state.name,
      email: this.state.email,
      photos: this.state.photos,
    };
    axios.post(`/qa/questions/${this.props.questionInfo.question_id}/answers`, obj)
      .then(() => {
        this.props.getAnswers(this.props.questionInfo.question_id);
      })
      .then((res) => {
        console.log(res);
        this.setState({
          body: '',
          name: '',
          email: '',
          photos: '',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  uploadPhoto(event) {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('upload_preset', 'catwalk');
    data.append('cloud_name', 'dgdqzfkbf');
    axios.post('https://api.cloudinary.com/v1_1/dgdqzfkbf/image/upload', data)
      .then((res) => {
        const { data: imageData } = res;
        this.setState((oldState) => ({
          photos: [...oldState.photos, imageData.url],
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submittedPhotos() {
    this.props.handleSubmit(this.state.photos);
  }

  render() {
    return ReactDom.createPortal(
      <div className="modal-background">
        <div className="modal-container">
          <button className="modalCloseBtn" onClick={() => { this.props.closeModal() }}> Close </button>
          <div className='title'>
            <h4> Submit Your Answer </h4>
            <h5> {this.props.productInfo.name} : {this.props.questionInfo.question_body}</h5>
          </div>
          <div className="body">
            <form onSubmit={this.handleSubmit}>
              <label>* Your Answer</label>
              <br />
              <textarea
                name="body"
                type="text"
                maxLength="1000"
                required
                autoComplete="off"
                placeholder="Answer..."
                value={this.state.body}
                onChange={this.handleChange}
              />
              <br />
              <br />
              <label>* What is your nickname</label>
              <br />
              <input
                name="name"
                type="text"
                maxLength="60"
                required
                autoComplete="off"
                placeholder="Example: jack543!"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <br />
              For privacy reasons, do not use your full name or email address
              <br />
              <br />
              <label>* Your email</label>
              <br />
              <input
                name="email"
                type="email"
                maxLength="60"
                required
                autoComplete="off"
                placeholder="Example: jack@email.com"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <br />
              For authentication reasons, you will not be emailed” will appear
              <br />
              <br />
              <span>Upload photos: </span>
              {this.state.photos.length < 5 ? <input type="file" onChange={this.uploadPhoto} placeholder="photos" /> : 'Maximum upload met'}
              <br />
              <br />
              <input
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>,
      document.getElementById('qa-portal'),
    );
  }
}

export default AnswerModal;
