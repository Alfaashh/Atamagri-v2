// components/FirebaseTestDashboard.tsx
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Sprout, CloudRain, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { useFirebaseCurrentData, useFirebaseHistory } from '@/hooks/useFirebaseData';
import { startDummyDataGenerator, sendDummyData } from '@/lib/dummyDataGenerator';

export default function FirebaseTestDashboard() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [stopGenerator, setStopGenerator] = useState<(() => void) | null>(null);
  
  const stationId = 'wisnu';
  const { currentData, loading, error } = useFirebaseCurrentData(stationId);
  const { history } = useFirebaseHistory(stationId, 10);

  // Start/Stop dummy data generator
  const toggleGenerator = () => {
    if (isGenerating && stopGenerator) {
      stopGenerator();
      setStopGenerator(null);
      setIsGenerating(false);
    } else {
      const stop = startDummyDataGenerator(stationId, 5); // Update every 5 seconds for testing
      setStopGenerator(() => stop);
      setIsGenerating(true);
    }
  };

  // Manual refresh
  const handleManualRefresh = () => {
    sendDummyData(stationId);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Test Firebase</h1>
          <p className="text-gray-600">Data sensor real-time dari Firebase</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleManualRefresh}
            variant="outline"
            disabled={loading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Segarkan
          </Button>
          <Button 
            onClick={toggleGenerator}
            variant={isGenerating ? "destructive" : "default"}
          >
            {isGenerating ? "Hentikan Generator" : "Mulai Generator"}
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {error ? (
                <>
                  <WifiOff className="w-5 h-5 text-red-500" />
                  <span className="text-red-500">Terputus</span>
                </>
              ) : (
                <>
                  <Wifi className="w-5 h-5 text-green-500" />
                  <span className="text-green-500">Terhubung ke Firebase</span>
                </>
              )}
            </div>
            <Badge variant={isGenerating ? "default" : "secondary"}>
              {isGenerating ? "Menghasilkan Data" : "Generator Berhenti"}
            </Badge>
          </div>
          {error && (
            <p className="text-sm text-red-500 mt-2">Error: {error}</p>
          )}
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data dari Firebase...</p>
        </div>
      )}

      {/* Current Data */}
      {!loading && currentData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Temperature */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Suhu</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {currentData.temperature.toFixed(1)}°C
                    </p>
                  </div>
                  <Thermometer className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            {/* Humidity */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Kelembaban</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {currentData.humidity.toFixed(1)}%
                    </p>
                  </div>
                  <Droplets className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            {/* Soil Moisture */}
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Kelembaban Tanah</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {currentData.soilMoisture.toFixed(1)}%
                    </p>
                  </div>
                  <Sprout className="w-8 h-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>

            {/* Rain Status */}
            <Card className={currentData.isRaining ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status Hujan</p>
                    <p className="text-xl font-bold text-gray-900">
                      {currentData.isRaining ? "Hujan" : "Tidak Hujan"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Intensitas: {currentData.rainIntensity.toFixed(1)}%
                    </p>
                  </div>
                  <CloudRain className={`w-8 h-8 ${currentData.isRaining ? 'text-blue-600' : 'text-gray-400'}`} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* History */}
          <Card>
            <CardHeader>
              <CardTitle>Pembacaan Terbaru</CardTitle>
              <CardDescription>{history.length} pembacaan sensor terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Waktu</th>
                      <th className="text-left p-2">Suhu</th>
                      <th className="text-left p-2">Kelembaban</th>
                      <th className="text-left p-2">Tanah</th>
                      <th className="text-left p-2">Hujan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.slice(0, 5).map((reading, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">
                          {reading.timestamp 
                            ? new Date(reading.timestamp).toLocaleTimeString() 
                            : 'T/A'}
                        </td>
                        <td className="p-2">{reading.temperature.toFixed(1)}°C</td>
                        <td className="p-2">{reading.humidity.toFixed(1)}%</td>
                        <td className="p-2">{reading.soilMoisture.toFixed(1)}%</td>
                        <td className="p-2">
                          <Badge variant={reading.isRaining ? "default" : "secondary"}>
                            {reading.isRaining ? "Ya" : "Tidak"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
