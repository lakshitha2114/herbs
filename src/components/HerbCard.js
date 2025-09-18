import React, { useState } from 'react';

const HerbCard = ({ name, state, benefits, image }) => {
  const [showImage, setShowImage] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleImage = () => {
    setShowImage(!showImage);
    if (!showImage) {
      setImageError(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const traceHerb = () => {
    alert(`Tracing information for ${name}...\n\nThis feature would typically:\n• Show cultivation details\n• Display growth timeline\n• Provide harvesting information\n• Show quality parameters`);
  };

  return (
    <div className="herb-module">
      <div className="plant-name">{name}</div>
      <div className="state-info">📍 State: {state}</div>
      <div className="benefits">💚 Benefits: {benefits}</div>
      
      <div className="button-container">
        <button className="btn view-btn" onClick={toggleImage}>
          {showImage ? 'Hide' : 'View'}
        </button>
        <button className="btn trace-btn" onClick={traceHerb}>
          Trace
        </button>
      </div>
      
      {showImage && (
        <div className="image-container fade-in">
          {!imageError ? (
            <img 
              src={image} 
              alt={`${name} Plant`} 
              className="herb-image"
              onError={handleImageError}
            />
          ) : (
            <div className="image-fallback">
              <div className="fallback-content">
                <span className="plant-emoji">🌿</span>
                <h3>{name}</h3>
                <p>Real Plant Image</p>
                <small>Click to refresh</small>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HerbCard;
