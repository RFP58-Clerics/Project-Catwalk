import React from 'react';
import './reviewstyles.css';

function ReviewPhotoModal({photo, closePhotoModal}) {
  return (
    <div className="reviewPhotoModalBackground">
      <div className="reviewPhotoModalContainer">
        <div className="reviewPhotoModalCloseBtn">
          <button className="searchButton" onClick={() => closePhotoModal(false)}>Close</button>
        </div>
        <div className="body">
            <img className="expandedReviewImg" src={photo.url} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ReviewPhotoModal;
