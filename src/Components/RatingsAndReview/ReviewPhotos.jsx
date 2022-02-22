import { useState } from 'react';
import React from 'react';
import ReviewPhotoModal from './ReviewPhotoModal.jsx';
import './reviewstyles.css';

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
          <div style={{display: 'inline-block'}} key={photoUrl}>
            <img
              className="reviewThumbnail"
              alt=""
              src={photoUrl}
              onClick={() => { setOpenPhotoModal({ url: photoUrl }); }}
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
