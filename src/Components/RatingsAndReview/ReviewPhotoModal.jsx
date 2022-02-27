import React from 'react';
import './reviewstyles.css';
import styled from 'styled-components';

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

function ReviewPhotoModal({photo, closePhotoModal}) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <Button onClick={() => closePhotoModal(false)}>Close</Button>
        <div className="body">
            <img className="expandedReviewImg" src={photo.url} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ReviewPhotoModal;
