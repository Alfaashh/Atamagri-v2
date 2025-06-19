"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Cloud,
  Droplets,
  Smartphone,
  BarChart3,
  Shield,
  Users,
  TrendingUp,
  Star,
  Menu,
  X,
  Play,
  ArrowRight,
  Zap,
  Wifi,
  Brain,
  Leaf,
  Sprout,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function AtamagriLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-green-800">Atamagri</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors text-sm lg:text-base">
                Beranda
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-green-600 transition-colors text-sm lg:text-base">
                Tentang
              </Link>
              <Link href="/solutions" className="text-gray-700 hover:text-green-600 transition-colors text-sm lg:text-base">
                Solusi
              </Link>
              <Link href="/atamastation" className="text-gray-700 hover:text-green-600 transition-colors text-sm lg:text-base">
                AtamaStation
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-green-600 transition-colors text-sm lg:text-base">
                Harga
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600 transition-colors text-sm lg:text-base">
                Kontak
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <Link href="/login">
                <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50 text-xs lg:text-sm">
                  Masuk
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs lg:text-sm">Akses Dashboard</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-green-100 bg-white/95 rounded-b-lg shadow-lg">
              <nav className="flex flex-col space-y-3 mt-4 px-2">
                <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50">
                  Beranda
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50">
                  Tentang
                </Link>
                <Link href="/solutions" className="text-gray-700 hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50">
                  Solusi
                </Link>
                <Link href="/atamastation" className="text-gray-700 hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50">
                  AtamaStation
                </Link>
                <Link href="/pricing" className="text-gray-700 hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50">
                  Harga
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-green-600 transition-colors py-2 px-3 rounded-md hover:bg-green-50">
                  Kontak
                </Link>
                <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200">
                  <Link href="/login">
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Akses Dashboard</Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - MOBILE OPTIMIZED */}
      <section className="py-8 sm:py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6 lg:space-y-8">
              <div className="space-y-4 text-center lg:text-left">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mx-auto lg:mx-0 inline-flex">
                  🌱 Teknologi Pertanian Cerdas
                </Badge>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Kecerdasan Iklim untuk <span className="text-green-600">Pertanian Cerdas</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Pemantauan cuaca real-time, analitik data iklim, dan rekomendasi keputusan berbasis AI untuk
                  petani, nelayan, dan peneliti dengan platform IoT AtamaStation kami.
                </p>
              </div>

              {/* Stats Grid - Mobile Optimized */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center bg-white/80 rounded-lg p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">50K+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Pengguna Aktif</div>
                </div>
                <div className="text-center bg-white/80 rounded-lg p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">85%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Peningkatan Hasil</div>
                </div>
                <div className="text-center bg-white/80 rounded-lg p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">24/7</div>
                  <div className="text-xs sm:text-sm text-gray-600">Pemantauan Real-time</div>
                </div>
              </div>

              {/* Action Buttons - Mobile Optimized */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center lg:justify-start">
                <Link href="/dashboard" className="flex-1 sm:flex-none">
                  <Button size="default" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3">
                    Akses Dashboard Anda
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="#" className="flex-1 sm:flex-none">
                  <Button size="default" variant="outline" className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50 px-6 py-3">
                    <Play className="mr-2 w-4 h-4" />
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image - Mobile Optimized */}
            <div className="order-1 lg:order-2 relative">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                <Image
                  src="/assets/dashboard.jpg"
                  alt="Pratinjau Dashboard Atamagri"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 bg-white rounded-xl p-3 sm:p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium">Data Langsung</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Mengatasi Tantangan Iklim Pertanian
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Ketidakpastian iklim mengancam ketahanan pangan. Atamagri menyediakan kecerdasan yang dibutuhkan petani untuk beradaptasi
              dan berkembang.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Tantangan</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 sm:p-4 bg-red-50 rounded-lg">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Cuaca Tidak Terduga</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Perubahan iklim menciptakan pola cuaca ekstrem yang merusak tanaman</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 sm:p-4 bg-orange-50 rounded-lg">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <Droplets className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Manajemen Air</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Irigasi yang tidak efisien menyebabkan pemborosan air dan hasil panen buruk</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 sm:p-4 bg-yellow-50 rounded-lg">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <Users className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Akses Data Terbatas</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Petani kurang memiliki data lingkungan real-time untuk pengambilan keputusan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-green-600">Solusi Kami</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 sm:p-4 bg-green-50 rounded-lg">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <Wifi className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Pemantauan Real-time</h4>
                    <p className="text-gray-600 text-sm sm:text-base">AtamaStation menyediakan pengumpulan data lingkungan berkelanjutan</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 sm:p-4 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <Brain className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Wawasan Bertenaga AI</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Algoritma pembelajaran mesin memberikan rekomendasi yang dapat ditindaklanjuti</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 sm:p-4 bg-purple-50 rounded-lg">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Analitik Data</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Tren historis dan analitik prediktif untuk perencanaan yang lebih baik</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Overview - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Kecerdasan Pertanian Komprehensif
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Semua yang Anda butuhkan untuk membuat keputusan berbasis data untuk operasi pertanian Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Data Cuaca Real-Time</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Pemantauan berkelanjutan suhu, kelembaban, curah hujan, angin, dan radiasi matahari
                </p>
              </CardContent>
            </Card>

            <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Dukungan Bertenaga AI</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Rekomendasi cerdas untuk penanaman, irigasi, dan waktu panen
                </p>
              </CardContent>
            </Card>

            <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">AtamaStation IoT</h3>
                <p className="text-sm sm:text-base text-gray-600">Sensor IoT canggih untuk pemantauan lingkungan yang komprehensif</p>
              </CardContent>
            </Card>

            <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Analitik Data</h3>
                <p className="text-sm sm:text-base text-gray-600">Tren historis, pemodelan prediktif, dan laporan yang dapat disesuaikan</p>
              </CardContent>
            </Card>

            <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Akses Web & Mobile</h3>
                <p className="text-sm sm:text-base text-gray-600">Akses data Anda di mana saja dengan aplikasi web dan mobile responsif</p>
              </CardContent>
            </Card>

            <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Sistem Peringatan Dini</h3>
                <p className="text-sm sm:text-base text-gray-600">Peringatan proaktif untuk cuaca ekstrem dan kondisi pertanian optimal</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Cara Kerja Atamagri</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Proses tiga langkah sederhana untuk mentransformasi operasi pertanian Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl sm:text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Pasang AtamaStation</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Pasang stasiun cuaca IoT kami di lahan Anda untuk pemantauan lingkungan berkelanjutan
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl sm:text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Akses Dashboard Anda</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Pantau data real-time, lihat analitik, dan terima rekomendasi bertenaga AI
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl sm:text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Optimalkan Operasi</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Buat keputusan berbasis data untuk meningkatkan hasil, mengurangi biaya, dan meminimalkan risiko
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Memberdayakan Komunitas Pertanian</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Melayani petani, nelayan, dan peneliti dengan solusi yang disesuaikan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            <Card className="p-6 sm:p-8 text-center border-green-200 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Sprout className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-semibold text-gray-900">Petani</div>
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  Optimalkan hasil panen dengan pertanian presisi dan manajemen irigasi cerdas
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 sm:p-8 text-center border-blue-200 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Droplets className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-semibold text-gray-900">Nelayan</div>
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  Pastikan operasi aman dengan prakiraan cuaca akurat dan kondisi laut
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 sm:p-8 text-center border-purple-200 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-semibold text-gray-900">Peneliti</div>
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  Akses data iklim komprehensif untuk studi pertanian dan lingkungan
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Kisah Sukses</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Hasil nyata dari petani yang menggunakan teknologi Atamagri
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="p-4 sm:p-6 bg-white border-green-200">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 italic">
                  "Atamagri membantu kami meningkatkan hasil panen padi sebesar 45% melalui waktu irigasi yang lebih baik dan prediksi cuaca."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">Budi Santoso</div>
                    <div className="text-xs sm:text-sm text-gray-600">Petani Padi, Jawa Tengah</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-4 sm:p-6 bg-white border-blue-200">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 italic">
                  "Peringatan cuaca menyelamatkan armada nelayan kami dari badai berbahaya. Keselamatan dan produktivitas meningkat signifikan."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">Ahmad Wijaya</div>
                    <div className="text-xs sm:text-sm text-gray-600">Nelayan, Jawa Timur</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-4 sm:p-6 bg-white border-purple-200 sm:col-span-2 lg:col-span-1">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 italic">
                  "Data komprehensif dari Atamagri sangat berharga untuk penelitian iklim dan studi pertanian kami."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">Dr. Sari Indrawati</div>
                    <div className="text-xs sm:text-sm text-gray-600">Peneliti Pertanian</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-6 lg:space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Siap Mentransformasi Pertanian Anda?</h2>
            <p className="text-base sm:text-lg lg:text-xl opacity-90">
              Bergabunglah dengan ribuan petani yang sudah menggunakan Atamagri untuk mengoptimalkan operasi dan meningkatkan hasil panen
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center max-w-lg mx-auto">
              <Link href="/dashboard" className="flex-1 sm:flex-none">
                <Button size="default" className="w-full sm:w-auto bg-white text-green-600 hover:bg-gray-100 px-6 py-3">
                  Akses Dashboard Anda
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact" className="flex-1 sm:flex-none">
                <Button
                  size="default"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-green-600 px-6 py-3"
                >
                  Hubungi Tim Penjualan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold">Atamagri</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400">Kecerdasan iklim untuk pertanian cerdas di Indonesia.</p>
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-gray-400">📧 info@atamagri.com</p>
                <p className="text-xs sm:text-sm text-gray-400">📱 +62 812-3456-7890</p>
                <p className="text-xs sm:text-sm text-gray-400">📍 Solo, Jawa Tengah, Indonesia</p>
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4">Solusi</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>
                  <Link href="/solutions" className="hover:text-white transition-colors">
                    Ikhtisar Platform
                  </Link>
                </li>
                <li>
                  <Link href="/atamastation" className="hover:text-white transition-colors">
                    AtamaStation IoT
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Harga
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4">Sumber Daya</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Dukungan
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-4">Tetap update dengan wawasan pertanian</p>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm"
                />
                <Button className="w-full bg-green-600 hover:bg-green-700 text-sm">Berlangganan</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">Hak Cipta © 2025 Atamagri. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
