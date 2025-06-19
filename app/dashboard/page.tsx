"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Zap,
  Gauge,
  CloudRain,
  BarChart3,
  Settings,
  User,
  Download,
  Leaf,
  ChevronDown,
  Bell,
  RefreshCw,
  MapPin,
  Newspaper,
  Eye,
  EyeOff,
  PlusCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Wifi,
  WifiOff,
  Filter,
  Layers,
  Activity,
  TreePine,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import Link from "next/link"
import { useState } from "react"
import { useFirebaseCurrentData, useFirebaseHistory } from '@/hooks/useFirebaseData';
import { sendDummyData, startDummyDataGenerator } from '@/lib/dummyDataGenerator';
import { timeAgo } from "@/lib/timeAgo";
import { useEffect } from "react";

// ===== LIGHT INTENSITY DUMMY GENERATOR =====
const LIGHT_BASE_VALUE = 450.0; // Base lux for indoor auditorium
const LIGHT_VARIANCE = 5.0; // ±5 lux variance

const generateLightIntensity = () => {
  const variance = (Math.random() - 0.5) * 2 * LIGHT_VARIANCE; // -5 to +5
  return parseFloat((LIGHT_BASE_VALUE + variance).toFixed(1));
};

// ===== CHART DATA ARRAYS =====
const temperatureData = [
  { time: "00:00", value: 24.5 },
  { time: "04:00", value: 22.8 },
  { time: "08:00", value: 28.3 },
  { time: "12:00", value: 35.1 },
  { time: "16:00", value: 33.7 },
  { time: "20:00", value: 29.2 },
]

const humidityData = [
  { time: "00:00", value: 78.2 },
  { time: "04:00", value: 82.1 },
  { time: "08:00", value: 65.4 },
  { time: "12:00", value: 57.7 },
  { time: "16:00", value: 61.3 },
  { time: "20:00", value: 69.8 },
]

const soilMoistureData = [
  { time: "00:00", value: 45.2 },
  { time: "04:00", value: 43.8 },
  { time: "08:00", value: 38.4 },
  { time: "12:00", value: 35.1 },
  { time: "16:00", value: 37.3 },
  { time: "20:00", value: 41.8 },
]

const windSpeedData = [
  { time: "00:00", value: 0 },
  { time: "04:00", value: 2.3 },
  { time: "08:00", value: 5.8 },
  { time: "12:00", value: 3.2 },
  { time: "16:00", value: 4.1 },
  { time: "20:00", value: 1.5 },
]

const rainIntensityData = [
  { time: "00:00", value: 0 },
  { time: "04:00", value: 0 },
  { time: "08:00", value: 2.1 },
  { time: "12:00", value: 0 },
  { time: "16:00", value: 1.3 },
  { time: "20:00", value: 0 },
]

const lightIntensityData = [
  { time: "00:00", value: 447.3 },
  { time: "04:00", value: 452.1 },
  { time: "08:00", value: 448.9 },
  { time: "12:00", value: 453.7 },
  { time: "16:00", value: 449.2 },
  { time: "20:00", value: 451.8 },
]

// Weather forecast data
const weatherForecast = [
  { time: "12:00", temp: 35, wind: 8, rain: 10, humidity: 58, icon: "☀️" },
  { time: "15:00", temp: 33, wind: 12, rain: 15, humidity: 62, icon: "⛅" },
  { time: "18:00", temp: 29, wind: 6, rain: 5, humidity: 70, icon: "☀️" },
  { time: "21:00", temp: 26, wind: 4, rain: 0, humidity: 75, icon: "🌙" },
  { time: "00:00", temp: 24, wind: 3, rain: 0, humidity: 80, icon: "🌙" },
  { time: "03:00", temp: 22, wind: 5, rain: 20, humidity: 85, icon: "🌧️" },
]

// News articles data
const newsArticles = [
  {
    id: 1,
    title: "Mengoptimalkan Irigasi Padi di Musim Kemarau",
    category: "Tanaman",
    excerpt: "Pelajari teknik manajemen air yang efektif untuk budidaya padi selama periode kekeringan.",
    image: "/assets/drought.png",
    readTime: "5 menit baca",
  },
  {
    id: 2,
    title: "Pola Cuaca dan Perencanaan Tanaman",
    category: "Cuaca",
    excerpt: "Memahami perubahan cuaca musiman untuk perencanaan pertanian dan pengambilan keputusan yang lebih baik.",
    image: "/assets/weather.png",
    readTime: "7 menit baca",
  },
  {
    id: 3,
    title: "Teknik Manajemen Kesehatan Tanah",
    category: "Tanah",
    excerpt: "Praktik penting untuk menjaga kesuburan tanah dan meningkatkan hasil panen secara berkelanjutan.",
    image: "/assets/soil.png",
    readTime: "6 menit baca",
  },
  {
    id: 4,
    title: "Strategi Pengendalian Hama Terpadu",
    category: "Hama",
    excerpt: "Pendekatan efektif untuk mengendalikan hama sambil meminimalkan dampak lingkungan di lahan pertanian.",
    image: "/assets/pest.png",
    readTime: "8 menit baca",
  },
]

// ===== STATION DATA WITH CORRECT 8 SENSORS =====
const DEFAULT_STATIONS = [
  {
    id: "wisnu",
    name: "Stasiun Test Wisnu",
    location: "Solo",
    status: "active",
    lastUpdate: "2 menit yang lalu",
    sensors: {
      temperature: { value: 0, unit: "°C", status: "normal" },
      airHumidity: { value: 0, unit: "%", status: "normal" },
      soilMoisture: { value: 0, unit: "%", status: "normal" },
      windSpeed: { value: 0, unit: "km/h", status: "normal" },
      rainIntensity: { value: 0, unit: "mm", status: "normal" },
      lightIntensity: { value: generateLightIntensity(), unit: "Lux", status: "normal" },
      solarWatt: { value: 0, unit: "W", status: "normal" },
      solarVoltage: { value: 0, unit: "V", status: "normal" },
    },
    uptime: "99.2%",
    updateInterval: "30 detik",
    sensorsNormal: "8/8",
  },
  {
    id: "test2",
    name: "Stasiun Test 2",
    location: "Jakarta",
    status: "active",
    lastUpdate: "5 hari yang lalu",
    sensors: {
      temperature: { value: 33.8, unit: "°C", status: "warning" },
      airHumidity: { value: 62.3, unit: "%", status: "normal" },
      soilMoisture: { value: 28.5, unit: "%", status: "normal" },
      windSpeed: { value: 4.2, unit: "km/h", status: "normal" },
      rainIntensity: { value: 1.5, unit: "mm", status: "normal" },
      lightIntensity: { value: generateLightIntensity(), unit: "Lux", status: "normal" },
      solarWatt: { value: 0, unit: "W", status: "normal" },
      solarVoltage: { value: 0, unit: "V", status: "normal" },
    },
    uptime: "98.7%",
    updateInterval: "30 detik",
    sensorsNormal: "7/8",
  },
  {
    id: "station3",
    name: "Stasiun 1 - Jakarta",
    location: "Jakarta",
    status: "inactive",
    lastUpdate: "3 minggu yang lalu",
    sensors: {
      temperature: { value: 0, unit: "°C", status: "error" },
      airHumidity: { value: 0, unit: "%", status: "error" },
      soilMoisture: { value: 0, unit: "%", status: "error" },
      windSpeed: { value: 0, unit: "km/h", status: "error" },
      rainIntensity: { value: 0, unit: "mm", status: "error" },
      lightIntensity: { value: 0, unit: "Lux", status: "error" },
      solarWatt: { value: 0, unit: "W", status: "error" },
      solarVoltage: { value: 0, unit: "V", status: "error" },
    },
    uptime: "0%",
    updateInterval: "Tidak Tersedia",
    sensorsNormal: "0/8",
  },
]

export default function Dashboard() {
  const [selectedStation, setSelectedStation] = useState<string | null>(null)
  const [userStations, setUserStations] = useState(DEFAULT_STATIONS)
  const [now, setNow] = useState(Date.now())
  const [activeView, setActiveView] = useState("dashboard")
  const [showPassword, setShowPassword] = useState(false)
  const [lightIntensity, setLightIntensity] = useState(generateLightIntensity())
  const [calibrationData, setCalibrationData] = useState({
    temperature: { multiplier: 1.0, offset: 0.0 },
    humidity: { multiplier: 1.0, offset: 0.0 },
    soil: { multiplier: 1.0, offset: 0.0 },
    wind: { multiplier: 1.0, offset: 0.0 },
    rain: { multiplier: 1.0, offset: 0.0 },
    light: { multiplier: 1.0, offset: 0.0 },
  })
  const [dateRange, setDateRange] = useState("last7days")
  const [exportFormat, setExportFormat] = useState("csv")

  const { currentData: firebaseData, loading: firebaseLoading, error: firebaseError } = useFirebaseCurrentData('wisnu');
  const { history: firebaseHistory } = useFirebaseHistory('wisnu', 20);

  // ===== LIGHT INTENSITY GENERATOR INTERVAL =====
  useEffect(() => {
    const lightInterval = setInterval(() => {
      setLightIntensity(generateLightIntensity());
    }, 5000); // Update every 5 seconds
    return () => clearInterval(lightInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60 * 1000); // Update every minute
    return () => clearInterval(interval);
  }, []);
  
  // ===== FIREBASE DATA INTEGRATION =====
  useEffect(() => {
    if (firebaseData && !firebaseLoading) {
      setUserStations(prevStations => {
        const updatedStations = [...prevStations];
        const stationIndex = updatedStations.findIndex(s => s.id === 'wisnu');
        
        if (stationIndex !== -1) {
          updatedStations[stationIndex] = {
            ...updatedStations[stationIndex],
            sensors: {
              temperature: { 
                value: firebaseData.temperature, 
                unit: "°C", 
                status: firebaseData.temperature > 40 ? "warning" : "normal" 
              },
              airHumidity: { 
                value: firebaseData.humidity, 
                unit: "%", 
                status: firebaseData.humidity < 30 || firebaseData.humidity > 80 ? "warning" : "normal" 
              },
              soilMoisture: { 
                value: firebaseData.soilMoisture, 
                unit: "%", 
                status: firebaseData.soilMoisture < 20 ? "warning" : "normal" 
              },
              windSpeed: { 
                value: firebaseData.windSpeed_kmh, 
                unit: "km/h", 
                status: firebaseData.windSpeed_kmh > 25 ? "warning" : "normal" 
              },
              rainIntensity: { 
                value: firebaseData.rainIntensity, 
                unit: "mm", 
                status: firebaseData.isRaining ? "warning" : "normal" 
              },
              lightIntensity: { 
                value: lightIntensity, 
                unit: "Lux", 
                status: "normal" 
              },
              solarWatt: { 
                value: 0, 
                unit: "W", 
                status: "normal" 
              },
              solarVoltage: { 
                value: 0, 
                unit: "V", 
                status: "normal" 
              },
            },
            status: firebaseError ? "inactive" : "active",
            lastUpdate: firebaseData.timestamp 
              ? timeAgo(firebaseData.timestamp)
              : "Tidak Diketahui"
          };
        }
        
        return updatedStations;
      });
    }
  }, [firebaseData, firebaseLoading, firebaseError, lightIntensity]);

  // ===== CHART DATA UPDATES =====
  useEffect(() => {
    if (firebaseHistory && firebaseHistory.length > 0) {
      // Update temperature data
      temperatureData.splice(0, temperatureData.length);
      firebaseHistory.slice(0, 6).reverse().forEach((item, index) => {
        temperatureData.push({
          time: `${index * 4}:00`,
          value: item.temperature
        });
      });
  
      // Update humidity data
      humidityData.splice(0, humidityData.length);
      firebaseHistory.slice(0, 6).reverse().forEach((item, index) => {
        humidityData.push({
          time: `${index * 4}:00`,
          value: item.humidity
        });
      });

      // Update soil moisture data
      soilMoistureData.splice(0, soilMoistureData.length);
      firebaseHistory.slice(0, 6).reverse().forEach((item, index) => {
        soilMoistureData.push({
          time: `${index * 4}:00`,
          value: item.soilMoisture
        });
      });

      // Update wind speed data
      windSpeedData.splice(0, windSpeedData.length);
      firebaseHistory.slice(0, 6).reverse().forEach((item, index) => {
        windSpeedData.push({
          time: `${index * 4}:00`,
          value: item.windSpeed_kmh
        });
      });

      // Update rain data
      rainIntensityData.splice(0, rainIntensityData.length);
      firebaseHistory.slice(0, 6).reverse().forEach((item, index) => {
        rainIntensityData.push({
          time: `${index * 4}:00`,
          value: item.rainIntensity
        });
      });

      // Update light intensity with generated data
      lightIntensityData.splice(0, lightIntensityData.length);
      for (let i = 0; i < 6; i++) {
        lightIntensityData.push({
          time: `${i * 4}:00`,
          value: generateLightIntensity()
        });
      }
    }
  }, [firebaseHistory]);  
  
  // ===== CALCULATIONS =====
  const activeStationsCount = userStations.filter((station) => station.status === "active").length
  const avgTemperature =
    userStations
      .filter((station) => station.status === "active")
      .reduce((sum, station) => sum + station.sensors.temperature.value, 0) / activeStationsCount || 0
  const avgHumidity =
    userStations
      .filter((station) => station.status === "active")
      .reduce((sum, station) => sum + station.sensors.airHumidity.value, 0) / activeStationsCount || 0

  // ===== HANDLERS =====
  const handleFirebaseRefresh = async () => {
    try {
      await sendDummyData('wisnu');
    } catch (error) {
      console.error('Refresh error:', error);
    }
  };
      
  const handleCalibrationUpdate = (sensor: string, field: string, value: number) => {
    setCalibrationData((prev) => ({
      ...prev,
      [sensor]: {
        ...prev[sensor as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleExportData = () => {
    alert(`Mengekspor data ${dateRange} dalam format ${exportFormat.toUpperCase()}`)
  }

  // ===== UTILITY FUNCTIONS =====
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600"
      case "warning":
        return "text-amber-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-600" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-50"
      case "warning":
        return "bg-amber-50"
      case "error":
        return "bg-red-50"
      default:
        return "bg-gray-50"
    }
  }

  // ===== SENSOR CARD COMPONENT =====
  const SensorCard = ({
    title,
    value,
    unit,
    icon: Icon,
    color,
    bgColor,
    status,
    data,
  }: {
    title: string
    value: number
    unit: string
    icon: any
    color: string
    bgColor: string
    status: string
    data?: any[]
  }) => (
    <Card className={`${bgColor} border-0 hover:shadow-md transition-shadow`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-center">
              <p className={`text-2xl font-bold ${color}`}>
                {value} <span className="text-sm font-normal">{unit}</span>
              </p>
              <div className="ml-2">{getStatusIcon(status)}</div>
            </div>
          </div>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
        {data && (
          <div className="h-10 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Area type="monotone" dataKey="value" stroke={color.replace("text-", "stroke-")} fill={bgColor} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">Status:</span>
          <span className={`text-xs font-medium ${getStatusColor(status)}`}>{status.toUpperCase()}</span>
        </div>
      </CardContent>
    </Card>
  )

  // ===== STATION CARD COMPONENT =====
  const StationCard = ({ station }: { station: any }) => (
    <Card
      className={`hover:shadow-md transition-shadow cursor-pointer ${
        station.status === "active" ? "border-green-200" : "border-gray-200"
      }`}
      onClick={() => setSelectedStation(station.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${
                station.status === "active" ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            ></div>
            <h3 className="font-medium text-gray-900">{station.name}</h3>
          </div>
          <Badge variant={station.status === "active" ? "default" : "secondary"}>
            {station.status === "active" ? "Aktif" : "Tidak Aktif"}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-500">Suhu</p>
            <p className="font-semibold text-gray-900">
              {station.status === "active"
                ? `${Number(station.sensors.temperature.value).toFixed(1)}°C`
                : "T/A"}
            </p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-500">Kelembaban</p>
            <p className="font-semibold text-gray-900">
              {station.status === "active"
                ? `${Number(station.sensors.airHumidity.value).toFixed(1)}%`
                : "T/A"}
            </p>
          </div>          
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {station.location}
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {station.lastUpdate}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Get current station data
  const currentStation = selectedStation ? userStations.find((station) => station.id === selectedStation) : null
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        {/* Sidebar */}
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="border-b border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Aplikasi Atamagri</h2>
                <p className="text-xs text-gray-500">Kode: 12345</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigasi</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => {
                        setActiveView("dashboard")
                        setSelectedStation(null)
                      }}
                      isActive={activeView === "dashboard" && !selectedStation}
                    >
                      <BarChart3 className="w-4 h-4" />
                      Dashboard
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Stasiun Cuaca</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {userStations.map((station) => (
                    <SidebarMenuItem key={station.id}>
                      <SidebarMenuButton
                        onClick={() => {
                          setSelectedStation(station.id)
                          setActiveView("dashboard")
                        }}
                        isActive={selectedStation === station.id}
                      >
                        <div className="flex items-center">
                          {station.status === "active" ? (
                            <Wifi className="w-4 h-4 mr-2" />
                          ) : (
                            <WifiOff className="w-4 h-4 mr-2" />
                          )}
                          {station.name}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Tambah Stasiun
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Pengaturan Pengguna
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveView("settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Pengaturan Akun
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveView("calibration")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Kalibrasi Sensor
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/" className="flex items-center w-full">
                    Keluar
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {activeView === "dashboard" && !selectedStation && "Ikhtisar Dashboard"}
                    {activeView === "dashboard" && selectedStation && currentStation?.name}
                    {activeView === "settings" && "Pengaturan Akun"}
                    {activeView === "calibration" && "Kalibrasi Sensor"}
                  </h1>
                  {selectedStation && currentStation && (
                    <p className="text-sm text-gray-500">
                      Lokasi: {currentStation.location} • Terakhir diperbarui: {currentStation.lastUpdate}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {selectedStation && (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Unduh Data
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Opsi Ekspor</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="p-2">
                          <Label htmlFor="date-range" className="text-xs mb-1 block">
                            Rentang Tanggal
                          </Label>
                          <Select value={dateRange} onValueChange={setDateRange}>
                            <SelectTrigger id="date-range" className="w-full">
                              <SelectValue placeholder="Pilih rentang tanggal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="today">Hari ini</SelectItem>
                              <SelectItem value="last7days">7 hari terakhir</SelectItem>
                              <SelectItem value="last30days">30 hari terakhir</SelectItem>
                              <SelectItem value="custom">Rentang khusus</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="p-2">
                          <Label htmlFor="format" className="text-xs mb-1 block">
                            Format
                          </Label>
                          <Select value={exportFormat} onValueChange={setExportFormat}>
                            <SelectTrigger id="format" className="w-full">
                              <SelectValue placeholder="Pilih format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="json">JSON</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <DropdownMenuSeparator />
                        <div className="p-2">
                          <Button className="w-full" onClick={handleExportData}>
                            Ekspor
                          </Button>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={selectedStation === 'wisnu' ? handleFirebaseRefresh : undefined}
                      >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Segarkan
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6 space-y-6">
            {activeView === "dashboard" && !selectedStation && (
              <>
                {/* Network Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Stasiun</p>
                          <p className="text-2xl font-bold text-gray-900">{userStations.length}</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Layers className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Stasiun Aktif</p>
                          <p className="text-2xl font-bold text-green-600">{activeStationsCount}</p>
                        </div>
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Wifi className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Rata-rata Suhu</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {avgTemperature.toFixed(1)} <span className="text-sm font-normal">°C</span>
                          </p>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Thermometer className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Rata-rata Kelembaban</p>
                          <p className="text-2xl font-bold text-green-600">
                            {avgHumidity.toFixed(1)} <span className="text-sm font-normal">%</span>
                          </p>
                        </div>
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Droplets className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Tambah Stasiun Baru
                  </Button>
                  <Button size="sm" variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter Stasiun
                  </Button>
                </div>

                {/* Stations List */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Stasiun Anda</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userStations.map((station) => (
                      <StationCard key={station.id} station={station} />
                    ))}
                  </div>
                </div>

                {/* Map View (Placeholder) */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Peta Stasiun
                    </CardTitle>
                    <CardDescription>Distribusi geografis stasiun cuaca Anda</CardDescription>
                  </CardHeader>
                    <CardContent className="h-[300px] bg-gray-100 flex items-center justify-center">
                      <img
                        src="/assets/map.png"
                        alt="Dummy Peta Stasiun"
                        className="h-full max-h-[280px] w-auto rounded shadow"
                      />
                  </CardContent>
                </Card>
              </>
            )}

            {activeView === "dashboard" && selectedStation && currentStation && (
              <>
                {/* Station Health Indicators */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Card className="bg-white">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <Activity className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">Status Sensor</p>
                          <p className="text-lg font-bold text-gray-900">
                            {currentStation.sensorsNormal} Sensor Normal
                          </p>
                        </div>
                      </div>
                      {currentStation.sensorsNormal === "8/8" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardContent className="p-4 flex items-center">
                      <Wifi className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Waktu Aktif</p>
                        <p className="text-lg font-bold text-gray-900">{currentStation.uptime}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardContent className="p-4 flex items-center">
                      <Clock className="w-5 h-5 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Interval Pembaruan</p>
                        <p className="text-lg font-bold text-gray-900">{currentStation.updateInterval}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Station Action Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Ekspor Data
                  </Button>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Konfigurasi Peringatan
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setActiveView("calibration")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Kalibrasi Sensor
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <FileText className="w-4 h-4 mr-2" />
                    Lihat Laporan
                  </Button>
                </div>

                {/* Tabs for different views */}
                <Tabs defaultValue="sensors" className="mb-6">
                  <TabsList>
                    <TabsTrigger value="sensors">Sensor</TabsTrigger>
                    <TabsTrigger value="forecast">Prakiraan Cuaca</TabsTrigger>
                    <TabsTrigger value="articles">Artikel</TabsTrigger>
                  </TabsList>
                  <TabsContent value="sensors" className="space-y-6">
                    {/* ===== 8 SENSOR CARDS WITH CORRECT DATA ===== */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <SensorCard
                        title="Temperatur"
                        value={Number(currentStation.sensors.temperature.value).toFixed(1)}
                        unit="°C"
                        icon={Thermometer}
                        color="text-blue-600"
                        bgColor="bg-blue-50"
                        status={currentStation.sensors.temperature.status}
                        data={temperatureData}
                      />
                      <SensorCard
                        title="Kelembaban Udara"
                        value={Number(currentStation.sensors.airHumidity.value).toFixed(1)}
                        unit="%"
                        icon={Droplets}
                        color="text-green-600"
                        bgColor="bg-green-50"
                        status={currentStation.sensors.airHumidity.status}
                        data={humidityData}
                      />
                      <SensorCard
                        title="Kelembaban Tanah"
                        value={Number(currentStation.sensors.soilMoisture.value).toFixed(1)}
                        unit="%"
                        icon={TreePine}
                        color="text-amber-600"
                        bgColor="bg-amber-50"
                        status={currentStation.sensors.soilMoisture.status}
                        data={soilMoistureData}
                      />
                      <SensorCard
                        title="Kecepatan Angin"
                        value={Number(currentStation.sensors.windSpeed.value).toFixed(1)}
                        unit="km/h"
                        icon={Wind}
                        color="text-cyan-600"
                        bgColor="bg-cyan-50"
                        status={currentStation.sensors.windSpeed.status}
                        data={windSpeedData}
                      />
                      <SensorCard
                        title="Curah Hujan"
                        value={Number(currentStation.sensors.rainIntensity.value).toFixed(1)}
                        unit="mm"
                        icon={CloudRain}
                        color="text-indigo-600"
                        bgColor="bg-indigo-50"
                        status={currentStation.sensors.rainIntensity.status}
                        data={rainIntensityData}
                      />
                      <SensorCard
                        title="Intensitas Cahaya"
                        value={Number(currentStation.sensors.lightIntensity.value).toFixed(1)}
                        unit="Lux"
                        icon={Sun}
                        color="text-orange-600"
                        bgColor="bg-orange-50"
                        status={currentStation.sensors.lightIntensity.status}
                        data={lightIntensityData}
                      />
                      <SensorCard
                        title="Watt Panel Surya"
                        value={Number(currentStation.sensors.solarWatt.value).toFixed(1)}
                        unit="W"
                        icon={Zap}
                        color="text-yellow-600"
                        bgColor="bg-yellow-50"
                        status={currentStation.sensors.solarWatt.status}
                        data={[]}
                      />
                      <SensorCard
                        title="Tegangan Panel Surya"
                        value={Number(currentStation.sensors.solarVoltage.value).toFixed(1)}
                        unit="V"
                        icon={Gauge}
                        color="text-purple-600"
                        bgColor="bg-purple-50"
                        status={currentStation.sensors.solarVoltage.status}
                        data={[]}
                      />
                    </div>

                    {/* Charts */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Thermometer className="w-5 h-5 text-blue-600" />
                            <span>Tren Temperatur</span>
                            <Badge variant="secondary" className="ml-auto">
                              Real-time
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={temperatureData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Droplets className="w-5 h-5 text-green-600" />
                            <span>Tren Kelembaban Udara</span>
                            <Badge variant="secondary" className="ml-auto">
                              Real-time
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={humidityData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <TreePine className="w-5 h-5 text-amber-600" />
                            <span>Tren Kelembaban Tanah</span>
                            <Badge variant="secondary" className="ml-auto">
                              Real-time
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={soilMoistureData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="value" stroke="#d97706" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Sun className="w-5 h-5 text-orange-600" />
                            <span>Tren Intensitas Cahaya</span>
                            <Badge variant="outline" className="ml-auto">
                              Generated
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={lightIntensityData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="value" stroke="#ea580c" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="forecast">
                    {/* Weather Forecast */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Sun className="w-5 h-5 text-orange-600" />
                          <span>Prakiraan Cuaca</span>
                        </CardTitle>
                        <CardDescription>Prakiraan cuaca 24 jam untuk {currentStation.location}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                          {weatherForecast.map((forecast, index) => (
                            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm font-medium text-gray-600">{forecast.time}</p>
                              <div className="text-2xl my-2">{forecast.icon}</div>
                              <p className="text-lg font-bold text-gray-900">{forecast.temp}°C</p>
                              <div className="grid grid-cols-2 gap-1 mt-2">
                                <div className="text-xs text-gray-500">
                                  <Wind className="w-3 h-3 inline mr-1" />
                                  {forecast.wind} km/h
                                </div>
                                <div className="text-xs text-blue-600">
                                  <Droplets className="w-3 h-3 inline mr-1" />
                                  {forecast.humidity}%
                                </div>
                              </div>
                              <div className="text-xs text-blue-600 mt-1">
                                <CloudRain className="w-3 h-3 inline mr-1" />
                                {forecast.rain}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="articles">
                    {/* News Articles */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Newspaper className="w-5 h-5 text-purple-600" />
                          <span>Artikel & Informasi Terkini</span>
                        </CardTitle>
                        <CardDescription>Berita pertanian terbaru dan tips bercocok tanam</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          {newsArticles.map((article) => (
                            <div
                              key={article.id}
                              className="flex space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                              <img
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Badge variant="outline" className="text-xs">
                                    {article.category}
                                  </Badge>
                                  <span className="text-xs text-gray-500">{article.readTime}</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                                  {article.title}
                                </h4>
                                <p className="text-xs text-gray-600 line-clamp-2">{article.excerpt}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}

            {activeView === "calibration" && (
              <Card>
                <CardHeader>
                  <CardTitle>Kalibrasi Sensor</CardTitle>
                  <CardDescription>Sesuaikan konstanta kalibrasi sensor untuk pembacaan yang akurat</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">ID Stasiun</Label>
                        <Input value={selectedStation || ""} disabled className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Nama Stasiun</Label>
                        <div className="flex space-x-2 mt-1">
                          <Input defaultValue={currentStation?.name || "Stasiun Cuaca"} />
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Simpan
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Kalibrasi Sensor</h3>

                    {/* Temperature Calibration */}
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-3 flex items-center">
                        <Thermometer className="w-4 h-4 mr-2 text-blue-600" />
                        Sensor Temperatur
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm">Nilai Mentah</Label>
                          <Input value={currentStation?.sensors.temperature.value || "0"} disabled />
                        </div>
                        <div>
                          <Label className="text-sm">Pengali</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={calibrationData.temperature.multiplier}
                            onChange={(e) =>
                              handleCalibrationUpdate("temperature", "multiplier", Number.parseFloat(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Offset</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={calibrationData.temperature.offset}
                            onChange={(e) =>
                              handleCalibrationUpdate("temperature", "offset", Number.parseFloat(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Nilai Terkalibrasi</Label>
                          <Input value={`${((currentStation?.sensors.temperature.value || 0) * calibrationData.temperature.multiplier + calibrationData.temperature.offset).toFixed(1)} °C`} disabled />
                          <Button size="sm" className="mt-2 w-full bg-blue-600 hover:bg-blue-700">
                            Perbarui
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Air Humidity Calibration */}
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-3 flex items-center">
                        <Droplets className="w-4 h-4 mr-2 text-green-600" />
                        Sensor Kelembaban Udara
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm">Nilai Mentah</Label>
                          <Input value={currentStation?.sensors.airHumidity.value || "0"} disabled />
                        </div>
                        <div>
                          <Label className="text-sm">Pengali</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={calibrationData.humidity.multiplier}
                            onChange={(e) =>
                              handleCalibrationUpdate("humidity", "multiplier", Number.parseFloat(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Offset</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={calibrationData.humidity.offset}
                            onChange={(e) =>
                              handleCalibrationUpdate("humidity", "offset", Number.parseFloat(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Nilai Terkalibrasi</Label>
                          <Input value={`${((currentStation?.sensors.airHumidity.value || 0) * calibrationData.humidity.multiplier + calibrationData.humidity.offset).toFixed(1)} %`} disabled />
                          <Button size="sm" className="mt-2 w-full bg-green-600 hover:bg-green-700">
                            Perbarui
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Additional calibration sections for other sensors */}
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-3 flex items-center">
                        <TreePine className="w-4 h-4 mr-2 text-amber-600" />
                        Sensor Kelembaban Tanah
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm">Nilai Mentah</Label>
                          <Input value={currentStation?.sensors.soilMoisture.value || "0"} disabled />
                        </div>
                        <div>
                          <Label className="text-sm">Pengali</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={calibrationData.soil.multiplier}
                            onChange={(e) =>
                              handleCalibrationUpdate("soil", "multiplier", Number.parseFloat(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Offset</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={calibrationData.soil.offset}
                            onChange={(e) =>
                              handleCalibrationUpdate("soil", "offset", Number.parseFloat(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Nilai Terkalibrasi</Label>
                          <Input value={`${((currentStation?.sensors.soilMoisture.value || 0) * calibrationData.soil.multiplier + calibrationData.soil.offset).toFixed(1)} %`} disabled />
                          <Button size="sm" className="mt-2 w-full bg-amber-600 hover:bg-amber-700">
                            Perbarui
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-3 flex items-center">
                        <Sun className="w-4 h-4 mr-2 text-orange-600" />
                        Sensor Intensitas Cahaya
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm">Nilai Generated</Label>
                          <Input value={lightIntensity.toFixed(1)} disabled />
                        </div>
                        <div>
                          <Label className="text-sm">Pengali</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={calibrationData.light.multiplier}
                            onChange={(e) =>
                              handleCalibrationUpdate("light", "multiplier", Number.parseFloat(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Offset</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={calibrationData.light.offset}
                            onChange={(e) =>
                              handleCalibrationUpdate("light", "offset", Number.parseFloat(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Nilai Terkalibrasi</Label>
                          <Input value={`${(lightIntensity * calibrationData.light.multiplier + calibrationData.light.offset).toFixed(1)} Lux`} disabled />
                          <Button size="sm" className="mt-2 w-full bg-orange-600 hover:bg-orange-700">
                            Perbarui
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeView === "settings" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Akun</CardTitle>
                    <CardDescription>Kelola informasi akun dan preferensi Anda</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Profil Pengguna</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nama</Label>
                          <Input id="name" defaultValue="John Doe" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700">Simpan</Button>
                    </div>

                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="text-lg font-semibold">Manajemen Kata Sandi</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="oldPassword">Kata Sandi Lama</Label>
                          <div className="relative">
                            <Input
                              id="oldPassword"
                              type={showPassword ? "text" : "password"}
                              placeholder="Masukkan kata sandi lama"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="newPassword">Kata Sandi Baru</Label>
                          <Input id="newPassword" type="password" placeholder="Masukkan kata sandi baru" />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi Baru</Label>
                          <Input id="confirmPassword" type="password" placeholder="Konfirmasi kata sandi baru" />
                        </div>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">Ganti</Button>
                    </div>

                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="text-lg font-semibold">Manajemen Perangkat</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                              <Wifi className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">AtamaStation #12345</h4>
                              <p className="text-sm text-gray-500">Firmware v2.1.0 • Terakhir terhubung: 2 menit yang lalu</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Kelola
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                              <AlertTriangle className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">AtamaStation #67890</h4>
                              <p className="text-sm text-gray-500">Firmware v2.0.5 • Terakhir terhubung: 3 hari yang lalu</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Kelola
                          </Button>
                        </div>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Tambah Perangkat Baru
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>

          {/* Footer */}
          <footer className="border-t border-gray-200 px-6 py-4 bg-white">
            <p className="text-sm text-gray-500 text-center">Hak Cipta © 2025 Atamagri. Semua hak dilindungi.</p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
