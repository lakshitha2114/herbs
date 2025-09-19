import React from 'react';
import { useParams, Link } from 'react-router-dom';

const HerbDetails = ({ herbs }) => {
  const { herbName } = useParams();
  
  // Find the herb from the props array
  const herb = herbs.find(h => h.name === herbName);

  // If the herbs array is still loading or the herb isn't found yet
  if (!herb) {
    // This can briefly show if you navigate directly to the page
    // before the main App component has finished loading data.
    return <div>Loading herb details or herb not found...</div>;
  }

  return (
    <div className="herb-details-container">
      <Link to="/" className="back-link">← Back to Collection</Link>
      <div className="herb-details-card">
        <div className="herb-details-header">
          <h1 className="plant-name">{herb.name}</h1>
        </div>
        <div className="herb-details-body">
          <div className="image-container-details">
            <img src={herb.image} alt={`${herb.name} Plant`} className="herb-image-details" />
          </div>
          <div className="details-content">
            <div className="benefits-details">
              <h2>Key Benefits</h2>
              <p>{herb.benefit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HerbDetails;
