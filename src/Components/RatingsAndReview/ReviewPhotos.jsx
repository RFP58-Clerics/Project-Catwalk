import { useState } from 'react';
import React from 'react';
import ReviewPhotoModal from './ReviewPhotoModal.jsx';

function ReviewPhotos({ photos }) {
  const [openPhotoModal, setOpenPhotoModal] = useState(false);

  return (
    <div>
      {photos.map((photo) => (
        <div key={photo.id}>
          <img className="reviewThumbnail" alt="" src={photo.url} onClick={() => { setOpenPhotoModal(photo); }} />
        </div>
      ))}
      {openPhotoModal && <ReviewPhotoModal photo={openPhotoModal} closePhotoModal={setOpenPhotoModal} />}
    </div>
  );
}

export default ReviewPhotos;
