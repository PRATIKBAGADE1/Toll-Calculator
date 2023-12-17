import React from 'react';

function TollDetailsDisplay({ tollDetails }) {
  return (
    <div>
      <h3>Toll Details</h3>
      <ul>
        {tollDetails.map((toll, index) => (
          <li key={index}>
            <p>Cost: {toll.cost}</p>
            <p>Additional Details: {toll.additionalDetails}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TollDetailsDisplay;
