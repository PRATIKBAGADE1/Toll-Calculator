// App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CalculateTollButton from './components/CalculateTollButton';
import RouteVisualization from './components/RouteVisualization';
import TollDetailsDisplay from './components/TollDetailsDisplay';
import UserEducation from './components/UserEducation';
import './App.css'; // Import the CSS file
import { calculateToll } from './utils/api';

function App() {
  const [waypoints, setWaypoints] = useState([]);
  const [polyline, setPolyline] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [tollDetails, setTollDetails] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('Car');
  const [departureTime, setDepartureTime] = useState('Now');
  const [userEducated, setUserEducated] = useState(false);

  useEffect(() => {
    if (!userEducated) {
      alert('Welcome to the Toll Calculator! Learn about toll calculations here.\n 1)Enter city and location to calculate the toll of vehicle');
      setUserEducated(true);
    }
  }, [userEducated]);

  const handleCalculateToll = async () => {
    try {
      const result = await calculateToll(waypoints, selectedVehicle, departureTime);
      setPolyline(result.polyline);
      setMarkers(result.markers);
      setTollDetails(result.tollDetails);
    } catch (error) {
      console.error('Error calculating toll:', error.message);
    }
  };

  return (
    <div className="container">
      <Header />
      <CalculateTollButton onClick={handleCalculateToll} />
      <div className="tollCalculator">
        <label htmlFor="vehicle" >Select Your City:</label>
        <select id="vehicle" value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
          <option value="City">City</option>
          <option value="City">Mumbai</option>
          <option value="City">Pune</option>
          <option value="City">Delhi</option>
          {/* Add other vehicle options as needed */}
        </select>
        <label htmlFor="departureTime">Departure Time:</label>
        <select id="departureTime" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)}>
          <option value="Now">Now</option>
          {/* Add other time options as needed */}
        </select>
      </div>
      <div className="mapContainer">
        <RouteVisualization polyline={polyline} markers={markers} />
      </div>
      <TollDetailsDisplay tollDetails={tollDetails} />
    </div>
  );
}

export default App;
