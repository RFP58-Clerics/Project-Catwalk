/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReviewPhotoModal from './ReviewPhotoModal.jsx';
import './reviewstyles.css';

const handleKeyPress = function handleKeyPress(event) {
  if (event.key === 'Enter') {
    console.log('enter press here! ');
  }
};

function ReviewPhotos({ photos }) {
  const [openPhotoModal, setOpenPhotoModal] = useState(false);

  return (
    <div>
      {photos.map((photo) => {
        let photoUrl = photo;
        if (typeof photo === 'object') {
          photoUrl = photo.url;
        }
        return (
          <div style={{ display: 'inline-block' }} key={photoUrl}>
            <img
              className="reviewThumbnail"
              src={photoUrl}
              alt="no img available"
              onClick={() => { setOpenPhotoModal({ url: photoUrl }); }}
              role="link"
              tabIndex={0}
              onKeyPress={handleKeyPress}
            />
          </div>
        );
      })}
      {openPhotoModal && (
        <ReviewPhotoModal photo={openPhotoModal} closePhotoModal={setOpenPhotoModal} />
      )}
    </div>
  );
}

export default ReviewPhotos;
