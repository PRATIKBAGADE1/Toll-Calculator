// api.js

const API_KEY = 'LdNBtGHdmmtBtpPmRHtG3M6jBnp2bm8b';




const calculateToll = async (waypoints) => {
  try {
    const response = await fetch('https://apis.tollguru.com/toll/v2/origin-destination-waypoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({
        from: {
          address: 'Philadelphia, Pennsylvania',
          lat: 39.95209,
          lng: -75.16219,
        },
        to: {
          address: 'New York, NY',
          lat: 40.71455,
          lng: -74.00715,
        },
        waypoints: waypoints.map((waypoint) => ({
          address: `Location ${waypoint.lat}, ${waypoint.lon}`,
          lat: waypoint.lat,
          lng: waypoint.lon,
        })),
        serviceProvider: 'here',
        vehicle: {
          type: '2AxlesTaxi',
          weight: {},
          height: {},
          length: {},
          axles: 4,
          emissionClass: 'euro_5',
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Toll calculation failed: ${response.statusText}`);
    }

    const result = await response.json();

    const polyline = result.trips[0].trip.legs[0].shape;
    const markers = result.fare_breakup.map((breakup) => ({
      lat: breakup.lat,
      lon: breakup.lon,
      cost: breakup.toll,
      additionalDetails: breakup.name,
    }));
    const tollDetails = result.fare_breakup.map((breakup) => ({
      cost: breakup.toll,
      additionalDetails: breakup.name,
    }));

    return { polyline, markers, tollDetails };
  } catch (error) {
    throw new Error(`Toll calculation failed: ${error.message}`);
  }
};

export { calculateToll };
