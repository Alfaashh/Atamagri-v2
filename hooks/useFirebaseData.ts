// hooks/useFirebaseData.ts
import { useState, useEffect } from 'react';
import { database, dbRef, dbOnValue } from '@/lib/firebase';

export interface SensorData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  soilMoistureRaw: number;
  isRaining: boolean;
  rainIntensity: number;
  timestamp: number;
}

export interface StationData {
  current: SensorData | null;
  history: Record<string, SensorData>;
  lastSeen: number | null;
  metadata: {
    name: string;
    location: string;
    ipAddress: string;
    status: string;
  } | null;
}

export const useFirebaseStation = (stationId: string) => {
  const [data, setData] = useState<StationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stationId) return;

    const stationRef = dbRef(database, `stations/${stationId}`);
    
    const unsubscribe = dbOnValue(
      stationRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          setError(null);
        } else {
          setData(null);
          setError('No data available');
        }
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    // Cleanup
    return () => unsubscribe();
  }, [stationId]);

  return { data, loading, error };
};

// Hook untuk mendapatkan data real-time current saja
export const useFirebaseCurrentData = (stationId: string) => {
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stationId) return;

    const currentRef = dbRef(database, `stations/${stationId}/current`);
    
    const unsubscribe = dbOnValue(
      currentRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setCurrentData(snapshot.val());
          setError(null);
        } else {
          setCurrentData(null);
          setError('No current data available');
        }
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [stationId]);

  return { currentData, loading, error };
};

// Hook untuk mendapatkan history data dengan limit
export const useFirebaseHistory = (stationId: string, limit: number = 20) => {
  const [history, setHistory] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stationId) return;

    const historyRef = dbRef(database, `stations/${stationId}/history`);
    
    const unsubscribe = dbOnValue(
      historyRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Convert object to array and sort by timestamp
          const historyArray = Object.entries(data)
            .map(([key, value]) => ({ key, ...(value as SensorData) }))
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
            .slice(0, limit);
          
          setHistory(historyArray);
          setError(null);
        } else {
          setHistory([]);
          setError('No history data available');
        }
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [stationId, limit]);

  return { history, loading, error };
};
