// client/app/page.jsx

import Link from 'next/link';
import { Truck, Shirt, Iron, CheckCircle } from 'lucide-react';

// Data untuk ditampilkan
const services = [
  { name: "REGULER", description: "Layanan Cuci Reguler estimasi 3 Hari" },
  { name: "SATUAN", description: "Layanan Cuci Satuan" },
  { name: "EKSPRESS", description: "Layanan Cuci Ekspress estimasi 5 Jam" }
];

const whyUs = [
  "Cepat dan Tepat waktu", "Bersih dan Higienis",
  "Layanan Antar Jemput", "Pilihan Layanan Laundry"
];

export default function HomePage() {
  return (
    <div className="bg-white">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">ByL Laundry</h1>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#layanan" className="text-gray-600 hover:text-blue-600">Layanan</Link>
            <Link href="#tentang" className="text-gray-600 hover:text-blue-600">Tentang Kami</Link>
          </div>
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Login</Link>
        </nav>
      </header>

      <main>
        <section className="bg-blue-50 text-center py-20 px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">ByL Laundry</h2>
          <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-2xl mx-auto">Serahkan semua cucian anda pada kami! bersih, cepat, cemerlang.</p>
        </section>

        <section id="layanan" className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-12">LAYANAN KAMI</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map(service => (
                <div key={service.name} className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <h4 className="text-2xl font-bold text-blue-600">{service.name}</h4>
                  <p className="mt-4 text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="tentang" className="bg-gray-50 py-20">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">Mengapa Memilih ByL Laundry??</h3>
              <ul className="mt-6 space-y-4">
                {whyUs.map(item => (
                  <li key={item} className="flex items-center text-lg">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img src="/laundry-image.png" alt="Ilustrasi Laundry" className="rounded-lg shadow-lg"/>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}