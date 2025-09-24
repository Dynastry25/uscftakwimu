import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="image-gallery">
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="gallery-item"
            onClick={() => setSelectedImage(image)}
          >
            <img src={image} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Modal for enlarged view */}
      {selectedImage && (
        <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img src={selectedImage} alt="Enlarged view" />
            <button className="close-modal">
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;