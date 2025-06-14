// client/app/page.jsx

import Link from 'next/link';
import { Truck, Shirt, Iron, CheckCircle } from 'lucide-react';

// Data untuk ditampilkan, bisa dipindahkan ke file lain nanti
const services = [
  { name: "REGULER", description: "Layanan Cuci Reguler estimasi 3 Hari" },
  { name: "SATUAN", description: "Layanan Cuci Satuan" },
  { name: "EKSPRESS", description: "Layanan Cuci Ekspress estimasi 5 Jam" }
];

const features = [
  { name: "Free Pickup", icon: Truck },
  { name: "Wash and Dry", icon: Shirt },
  { name: "Fold and Iron", icon: Iron },
  { name: "Free Delivery", icon: Truck }
];

const whyUs = [
  "Cepat dan Tepat waktu",
  "Bersih dan Higienis",
  "Layanan Antar Jemput",
  "Pilihan Layanan Laundry"
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Header dan Navigasi */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">ByL Laundry</h1>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#layanan" className="text-gray-600 hover:text-blue-600 transition-colors">Layanan</Link>
            <Link href="#tentang" className="text-gray-600 hover:text-blue-600 transition-colors">Tentang Kami</Link>
            <Link href="#kontak" className="text-gray-600 hover:text-blue-600 transition-colors">Kontak</Link>
          </div>
          <Link href="/admin/dashboard" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Login
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-blue-50 text-center py-20 px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">ByL Laundry</h2>
          <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-2xl mx-auto">Serahkan semua cucian anda pada kami! bersih, cepat, cemerlang.</p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center p-4 rounded-lg">
                <feature.icon className="w-12 h-12 text-blue-600 mb-3" />
                <p className="font-semibold text-gray-700">{feature.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Layanan Kami Section */}
        <section id="layanan" className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">LAYANAN KAMI</h3>
            <p className="text-gray-500 mb-12">Pilih layanan yang paling sesuai dengan kebutuhan Anda.</p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map(service => (
                <div key={service.name} className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <h4 className="text-2xl font-bold text-blue-600">{service.name}</h4>
                  <p className="mt-4 text-gray-600">{service.description}</p>
                  <button className="mt-6 bg-blue-100 text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-200 transition-colors">
                    Lihat Detail
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mengapa Memilih Kami Section */}
        <section id="tentang" className="bg-gray-50 py-20">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-bold text-gray-800">Mengapa Memilih ByL Laundry??</h3>
              <p className="text-gray-500 mt-4">Kami hadir sebagai solusi praktis dan profesional bagi Anda yang mengutamakan kebersihan, kerapian, dan ketepatan waktu.</p>
              <ul className="mt-6 space-y-4">
                {whyUs.map(item => (
                  <li key={item} className="flex items-center text-lg">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2">
              {/* Anda perlu menempatkan gambar di folder public */}
              <img src="/laundry-image.png" alt="Happy woman with laundry" className="rounded-lg shadow-2xl w-full h-auto object-cover"/>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="kontak" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold">Hubungi Kami</h3>
          <p className="mt-4">Garuda No. 99, Klaten, Jawa Tengah, Indonesia</p>
          <p>Email: kontak@byl-laundry.com | Telepon: (0272) 123-456</p>
          <div className="mt-6 text-sm">
            &copy; {new Date().getFullYear()} ByL Laundry. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}