// client/app/admin/presensi/page.jsx
'use client';

import { useState, useEffect } from 'react';

// Komponen utama untuk halaman Presensi
export default function PresensiPage() {
  // State untuk menyimpan data check-in dan check-out
  const [checkInData, setCheckInData] = useState(null);
  const [checkOutData, setCheckOutData] = useState(null);

  // State untuk menyimpan informasi pengguna dan lokasi
  const [userInfo, setUserInfo] = useState({
    name: "Naufal Zafrany Syamsudin", // Data contoh
    id: "asdlk-ewiur-LJlaasf",       // Data contoh
    coordinates: "Mencari...",
    ip: "Mencari...",
  });

  // useEffect untuk mengambil data IP dan koordinat saat komponen pertama kali dimuat
  useEffect(() => {
    // 1. Mengambil alamat IP
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setUserInfo(prev => ({ ...prev, ip: data.ip }));
      })
      .catch(() => {
        setUserInfo(prev => ({ ...prev, ip: 'Gagal mendapatkan IP' }));
      });

    // 2. Mengambil koordinat lokasi
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserInfo(prev => ({ ...prev, coordinates: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` }));
        },
        () => {
          setUserInfo(prev => ({ ...prev, coordinates: 'Izin lokasi ditolak' }));
        }
      );
    } else {
      setUserInfo(prev => ({ ...prev, coordinates: 'Geolocation tidak didukung' }));
    }
  }, []); // Array kosong berarti efek ini hanya berjalan sekali

  // Fungsi yang dijalankan saat tombol CHECK-IN diklik
  const handleCheckIn = () => {
    setCheckInData(new Date());
  };

  // Fungsi yang dijalankan saat tombol CHECK-OUT diklik
  const handleCheckOut = () => {
    setCheckOutData(new Date());
  };

  return (
    <div className="p-8 bg-gray-50 min-h-full flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
            {/* Ganti dengan gambar avatar yang sesuai */}
            <img src="/avatar-placeholder.png" alt="Avatar" className="w-24 h-24 mx-auto rounded-full object-cover mb-4" />
            <h2 className="text-xl font-bold text-gray-800">{userInfo.name}</h2>
            <p className="text-sm text-gray-500">{userInfo.id}</p>
        </div>
        
        <div className="space-y-3 pt-6 border-t mt-6">
            <div className="flex justify-between text-sm"><span className="font-medium text-gray-600">Koordinat:</span> <span className="font-mono bg-gray-100 px-2 py-1 rounded">{userInfo.coordinates}</span></div>
            <div className="flex justify-between text-sm"><span className="font-medium text-gray-600">Alamat IP:</span> <span className="font-mono bg-gray-100 px-2 py-1 rounded">{userInfo.ip}</span></div>
            <div className="flex justify-between items-center pt-2">
                <span className="font-medium text-gray-600">Check-In:</span> 
                <span className="font-bold text-green-600">{checkInData ? checkInData.toLocaleTimeString('id-ID') : '-'}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Check-Out:</span> 
                <span className="font-bold text-red-600">{checkOutData ? checkOutData.toLocaleTimeString('id-ID') : '-'}</span>
            </div>
        </div>

        <div className="pt-8">
            {/* Logika untuk menampilkan tombol yang sesuai */}
            {!checkInData ? (
                <button onClick={handleCheckIn} className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors shadow-md">
                    CHECK-IN
                </button>
            ) : !checkOutData ? (
                 <button onClick={handleCheckOut} className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors shadow-md">
                    CHECK-OUT
                </button>
            ) : (
                <p className="text-center text-gray-600 font-medium bg-gray-100 p-3 rounded-lg">Presensi hari ini sudah lengkap.</p>
            )}
        </div>
      </div>
    </div>
  );
}