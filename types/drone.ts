// types/drone.ts
export interface DroneStatus {
  connected: boolean
  mode: string
  battery: number
  signal: number
  altitude?: number
  speed?: number
  isConnected?: boolean
}

export interface Prediction {
  class: string
  confidence: number
}

export interface DroneData {
  status: "connected" | "disconnected" | "flying" | "landing" | "error"
  battery: number
  signal: number
  altitude: number
  speed: number
  diseaseDetections: number
  areasScanned: number
  temperature?: number
  humidity?: number
  gpsCoordinates?: {
    lat: number
    lng: number
  }
}

export interface MissionData {
  id: string
  name: string
  status: "planned" | "active" | "completed" | "cancelled"
  area: number
  detections: number
  completedTime?: string
  plannedWaypoints?: Array<{
    lat: number
    lng: number
    altitude: number
  }>
}

export interface DetectionResult {
  id: string
  timestamp: string
  location: {
    lat: number
    lng: number
  }
  prediction: Prediction
  confidence: number
  imageUrl?: string
  severity: "low" | "medium" | "high"
}

export interface DroneCommand {
  command: "takeoff" | "land" | "emergency" | "up" | "down" | "flip" | "forward" | "backward" | "left" | "right"
  value?: number
}

export interface VideoStreamData {
  source: "tello" | "webcam"
  url?: string
  status: "active" | "inactive" | "error"
}

export interface DroneSettings {
  videoSource: "tello" | "webcam"
  detectionThreshold: number
  autoCapture: boolean
  flightMode: "manual" | "auto"
  maxAltitude: number
  maxSpeed: number
}
