// RouteVisualization.js
import React, { useEffect } from 'react';
import L from 'leaflet';
import { decode } from "@googlemaps/polyline-codec"; // Import decode function

function RouteVisualization({ polyline, markers }) {
  useEffect(() => {
    // Create a Leaflet map
    const map = L.map('leafletMapContainer').setView([0, 0], 2);

    // Add a base map layer (customize this based on your needs)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Decode polyline and add it to the map
    if (polyline && polyline.length > 0) {
      const decodedPolyline = decode(polyline, 5); // Use decode function
      L.polyline(decodedPolyline, { color: 'blue' }).addTo(map);

      // Fit the map to the bounds of the polyline
      map.fitBounds(L.latLngBounds(decodedPolyline));
    }

    // Add markers to the map
    if (markers && markers.length > 0) {
      markers.forEach(marker => {
        L.marker([marker.lat, marker.lon])
          .addTo(map)
          .bindPopup(`Toll Cost: ${marker.cost}<br>Additional Details: ${marker.additionalDetails || 'No additional details available'}`)
          .openPopup();
      });
    }

    // Add zoom in and zoom out controls to the map
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Handle map resizing on window resize
    window.addEventListener('resize', () => {
      map.invalidateSize();
    });

    return () => {
      // Clean up resources if needed
      map.remove();
    };
  }, [polyline, markers]);

  return <div id="leafletMapContainer" style={{ height: '400px', width: '100%', overflow: 'hidden', border: '1px solid #ccc' }} />;
}

export default RouteVisualization;
