import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, Target, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-green-800">Atamagri</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors">
                Beranda
              </Link>
              <Link href="/about" className="text-green-600 font-medium">
                Tentang
              </Link>
              <Link href="/solutions" className="text-gray-700 hover:text-green-600 transition-colors">
                Solusi
              </Link>
              <Link href="/atamastation" className="text-gray-700 hover:text-green-600 transition-colors">
                AtamaStation
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-green-600 transition-colors">
                Harga
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600 transition-colors">
                Kontak
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Masuk
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Akses Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Misi Kami Mentransformasi Pertanian</h1>
            <p className="text-xl text-gray-600 mb-8">
              Atamagri berdedikasi untuk memberdayakan petani dengan kecerdasan iklim dan teknologi cerdas untuk meningkatkan
              hasil panen, mengurangi risiko, dan mempromosikan pertanian berkelanjutan di seluruh Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kisah Kami</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Atamagri didirikan pada tahun 2020 oleh tim peneliti dari Universitas Sebelas Maret dengan keahlian di bidang
                  Fisika, Statistika, dan Teknologi Pertanian. Perjalanan kami dimulai dengan pengamatan sederhana: petani
                  di seluruh Indonesia semakin rentan terhadap pola cuaca yang tidak dapat diprediksi akibat perubahan iklim.
                </p>
                <p>
                  Kami bertekad untuk menciptakan teknologi pemantauan cuaca yang terjangkau dan dapat diakses yang dapat memberikan
                  data hyperlokal kepada petani, membantu mereka membuat keputusan yang lebih baik tentang penanaman, irigasi, dan
                  panen. Yang dimulai sebagai proyek penelitian dengan cepat berkembang menjadi platform kecerdasan pertanian komprehensif.
                </p>
                <p>
                  Saat ini, Atamagri melayani ribuan petani, nelayan, dan peneliti di seluruh Indonesia, menyediakan
                  data cuaca real-time, rekomendasi bertenaga AI, dan analitik yang membantu meningkatkan hasil panen, mengurangi
                  pemborosan sumber daya, dan membangun ketahanan iklim.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl p-6 shadow-2xl">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Tim Atamagri"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-xl text-gray-600">Prinsip yang memandu segala yang kami lakukan</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Inovasi</h3>
                <p className="text-gray-600">
                  Kami terus mengembangkan teknologi mutakhir untuk memecahkan tantangan pertanian nyata.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Aksesibilitas</h3>
                <p className="text-gray-600">
                  Kami menjadikan teknologi pertanian canggih terjangkau dan dapat diakses oleh petani dari segala skala.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Keberlanjutan</h3>
                <p className="text-gray-600">
                  Kami mempromosikan praktik pertanian berkelanjutan yang melindungi lingkungan untuk generasi mendatang.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Temui Tim Kami</h2>
            <p className="text-xl text-gray-600">Para ahli di balik inovasi Atamagri</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Dr. Ahmad Susanto</h3>
                  <p className="text-green-600 font-medium">CEO & Co-Founder</p>
                  <p className="text-sm text-gray-600">PhD dalam Fisika Pertanian</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Sari Wijayanti, M.Sc</h3>
                  <p className="text-green-600 font-medium">CTO & Co-Founder</p>
                  <p className="text-sm text-gray-600">Master dalam Statistika & Data Science</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Budi Hartono, M.Eng</h3>
                  <p className="text-green-600 font-medium">Kepala Teknik</p>
                  <p className="text-sm text-gray-600">Master dalam Teknologi Pertanian</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Bergabung dengan Misi Kami?</h2>
          <p className="text-xl mb-8 opacity-90">
            Jadilah bagian dari revolusi pertanian dan bantu membangun masa depan yang lebih berkelanjutan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Mulai Hari Ini
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">Hak Cipta © 2025 Atamagri. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  )
}
