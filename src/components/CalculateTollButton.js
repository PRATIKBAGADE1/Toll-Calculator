// CalculateTollButton.js
import React, { useState } from 'react';
import { calculateToll } from '../utils/api';

const vehicleTypes = ['Car', 'SUV', 'Pickup Truck', '2AxlesTaxi']; // Add more vehicle types if needed

function CalculateTollButton({ onClick, waypoints }) {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleTypes[0]);

  const handleCalculateToll = async () => {
    try {
      const result = await calculateToll(waypoints, selectedVehicle);
      console.log('Toll Calculation Result:', result);

      // Handle the result as needed
    } catch (error) {
      console.error('Error calculating toll:', error.message);
    }
  };

  return (
    <div>
      <label htmlFor="vehicleType">Select Your Vehicle</label>
      <select id="vehicleType" onChange={(e) => setSelectedVehicle(e.target.value)} value={selectedVehicle}>
        {vehicleTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button id="calculateToll" onClick={handleCalculateToll}>
        Calculate Toll
      </button>
    </div>
  );
}

export default CalculateTollButton;
