// lib/dummyDataGenerator.ts
import { database, dbRef, dbSet, dbPush, dbServerTimestamp } from './firebase';

// Generate random sensor values
const generateSensorData = () => {
  return {
    temperature: 25 + Math.random() * 10, // 25-35°C
    humidity: 50 + Math.random() * 30, // 50-80%
    soilMoisture: 40 + Math.random() * 40, // 40-80%
    soilMoistureRaw: 1500 + Math.random() * 2000, // 1500-3500
    isRaining: Math.random() > 0.7, // 30% chance of rain
    rainIntensity: Math.random() * 100, // 0-100%
    timestamp: dbServerTimestamp()
  };
};

// Station metadata
const generateStationMetadata = (stationId: string) => {
  return {
    name: `Station ${stationId}`,
    location: stationId === 'wisnu' ? 'Solo' : 'Jakarta',
    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
    status: 'online'
  };
};

// Send dummy data to Firebase
export const sendDummyData = async (stationId: string = 'wisnu') => {
  try {
    const sensorData = generateSensorData();
    
    // Update current data
    const currentRef = dbRef(database, `stations/${stationId}/current`);
    await dbSet(currentRef, sensorData);
    
    // Push to history
    const historyRef = dbRef(database, `stations/${stationId}/history`);
    await dbPush(historyRef, sensorData);
    
    // Update last seen
    const lastSeenRef = dbRef(database, `stations/${stationId}/lastSeen`);
    await dbSet(lastSeenRef, dbServerTimestamp());
    
    // Update metadata
    const metadataRef = dbRef(database, `stations/${stationId}/metadata`);
    await dbSet(metadataRef, generateStationMetadata(stationId));
    
    console.log('✅ Dummy data sent to Firebase');
    return sensorData;
  } catch (error) {
    console.error('❌ Error sending dummy data:', error);
    throw error;
  }
};

// Start sending dummy data periodically
export const startDummyDataGenerator = (stationId: string = 'wisnu', intervalSeconds: number = 30) => {
  // Send initial data
  sendDummyData(stationId);
  
  // Send data periodically
  const interval = setInterval(() => {
    sendDummyData(stationId);
  }, intervalSeconds * 1000);
  
  // Return stop function
  return () => clearInterval(interval);
};
