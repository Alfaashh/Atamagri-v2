import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Wifi, WifiOff, RefreshCw, Zap, Activity } from "lucide-react";

type DroneStatus = {
  connected: boolean;
  mode: string;
  battery?: number;
  signal?: number;
  error?: string;
};

const DRONE_API_URL = process.env.NEXT_PUBLIC_DRONE_API_URL || "http://localhost:8000";

export default function DroneControl() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"webcam" | "tello">("webcam");
  const [status, setStatus] = useState<DroneStatus>({
    connected: false,
    mode: "webcam",
    battery: undefined,
    signal: undefined,
    error: undefined,
  });
  const [battery, setBattery] = useState<number | null>(null);
  const [signal, setSignal] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch drone status from backend
  const fetchStatus = async () => {
    try {
      const res = await fetch(`${DRONE_API_URL}/status`);
      if (!res.ok) throw new Error("Failed to fetch drone status");
      const data = await res.json();
      setStatus(data);
      setBattery(data.battery ?? null);
      setSignal(data.signal ?? null);
      setIsConnected(data.connected);
    } catch (err) {
      setStatus((prev) => ({ ...prev, connected: false, error: "Gagal fetch status drone" }));
      setIsConnected(false);
      setError("Gagal fetch status drone");
    }
  };

  // Connect to drone or webcam
  async function connectToDevice(selectedSource: "webcam" | "tello") {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${DRONE_API_URL}/start?source=${selectedSource}`);
      if (!response.ok) throw new Error(`Failed to connect to ${selectedSource}`);
      setIsConnected(true);
      setSource(selectedSource);
      setStatus((prev) => ({
        ...prev,
        connected: true,
        mode: selectedSource,
        error: undefined,
      }));
      await fetchStatus();
    } catch (err) {
      setError(`Failed to connect to ${selectedSource}`);
      setIsConnected(false);
      setStatus((prev) => ({
        ...prev,
        connected: false,
        mode: "error",
        error: `Gagal koneksi ke ${selectedSource}`,
      }));
    } finally {
      setIsLoading(false);
    }
  }

  // Refresh drone status
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchStatus();
    setRefreshing(false);
  };

  // Takeoff and Land
  const handleTakeoff = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${DRONE_API_URL}/takeoff`, { method: "POST" });
      if (!res.ok) throw new Error("Gagal takeoff");
      await fetchStatus();
    } catch (err) {
      setError("Gagal takeoff");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLand = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${DRONE_API_URL}/land`, { method: "POST" });
      if (!res.ok) throw new Error("Gagal landing");
      await fetchStatus();
    } catch (err) {
      setError("Gagal landing");
    } finally {
      setIsLoading(false);
    }
  };

  // Move drone
  const handleMove = async (direction: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${DRONE_API_URL}/move?direction=${direction}`, { method: "POST" });
      if (!res.ok) throw new Error("Gagal kontrol drone");
    } catch (err) {
      setError("Gagal kontrol drone");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial connect and polling
  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5_000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  // Auto connect if source changes
  useEffect(() => {
    connectToDevice(source);
    // eslint-disable-next-line
  }, [source]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <Button variant={source === "webcam" ? "default" : "outline"} onClick={() => setSource("webcam")}>
          Webcam
        </Button>
        <Button variant={source === "tello" ? "default" : "outline"} onClick={() => setSource("tello")}>
          Tello Drone
        </Button>
        <Button variant="ghost" onClick={handleRefresh} disabled={refreshing || isLoading}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {refreshing ? "Menyegarkan..." : "Refresh"}
        </Button>
        <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {source === "tello" ? "Connected to Tello" : "Using Webcam"}
        </span>
        {status.connected ? (
          <Badge variant="default" className="flex gap-1 items-center">
            <Wifi className="w-4 h-4" /> Connected
          </Badge>
        ) : (
          <Badge variant="destructive" className="flex gap-1 items-center">
            <WifiOff className="w-4 h-4" /> Disconnected
          </Badge>
        )}
        {status.mode === "error" && (
          <span className="text-red-600 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" /> {status.error || "Error"}
          </span>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Live Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Live Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                </div>
              ) : (
                <img
                  src={`${DRONE_API_URL}/video_feed?${Date.now()}`}
                  alt="Drone/Webcam Feed"
                  className="w-full h-full object-cover"
                  onError={() => setError("Live feed gagal dimuat")}
                />
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">
                {source === "tello" ? "Tello" : "Webcam"}
              </Badge>
              {battery !== null && (
                <span className="flex items-center gap-1 text-green-700">
                  <Zap className="w-4 h-4" /> {battery}%
                </span>
              )}
              {signal !== null && (
                <span className="flex items-center gap-1 text-blue-700">
                  <Activity className="w-4 h-4" /> Sinyal: {signal}%
                </span>
              )}
            </div>
            {error && (
              <div className="text-red-500 mt-2">{error}</div>
            )}
          </CardContent>
        </Card>
        
        {/* Drone Controls & Info */}
        <Card>
          <CardHeader>
            <CardTitle>Kontrol Drone</CardTitle>
            <CardDescription>
              {source === "tello"
                ? "Kontrol manual untuk Tello Drone."
                : "Webcam hanya untuk monitoring video, tidak ada kontrol drone."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {source === "tello" && (
              <div className="space-y-3">
                <div className="flex gap-2 items-center">
                  <Button onClick={handleTakeoff} disabled={isLoading || !status.connected}>
                    Takeoff
                  </Button>
                  <Button onClick={handleLand} disabled={isLoading || !status.connected}>
                    Land
                  </Button>
                </div>
                <div className="flex flex-col items-center mt-4 gap-1">
                  <div className="flex gap-2">
                    <Button onClick={() => handleMove("up")} disabled={isLoading || !status.connected}>
                      ⬆️
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleMove("left")} disabled={isLoading || !status.connected}>
                      ⬅️
                    </Button>
                    <Button onClick={() => handleMove("forward")} disabled={isLoading || !status.connected}>
                      ⬆️
                    </Button>
                    <Button onClick={() => handleMove("right")} disabled={isLoading || !status.connected}>
                      ➡️
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleMove("down")} disabled={isLoading || !status.connected}>
                      ⬇️
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => handleMove("rotate_left")} disabled={isLoading || !status.connected}>
                    Rotate ⟲
                  </Button>
                  <Button onClick={() => handleMove("rotate_right")} disabled={isLoading || !status.connected}>
                    Rotate ⟳
                  </Button>
                </div>
              </div>
            )}
            {source === "webcam" && (
              <div className="text-gray-600 text-sm">
                Webcam aktif hanya untuk feed video. Kontrol drone tidak tersedia.
              </div>
            )}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="font-bold">Status:</span>
                {status.connected ? (
                  <span className="text-green-600">Terhubung</span>
                ) : (
                  <span className="text-red-600">Tidak Terhubung</span>
                )}
              </div>
              {battery !== null && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold">Baterai:</span>
                  <span>{battery}%</span>
                </div>
              )}
              {signal !== null && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold">Sinyal:</span>
                  <span>{signal}%</span>
                </div>
              )}
              {status.error && (
                <div className="mt-2 text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> {status.error}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
