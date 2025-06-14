// client/app/admin/manajemen-pesanan/page.jsx

'use client';
import { useState, useEffect } from 'react';
import { Loader2, ServerCrash } from 'lucide-react';

export default function ManajemenPesanan() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Ambil token dari localStorage
    const token = localStorage.getItem('laundry_token');
    if (!token) {
      setError("Akses ditolak. Silakan login sebagai admin.");
      setIsLoading(false);
      return;
    }

    // 2. Lakukan fetch DENGAN menyertakan token di header
    fetch('http://localhost:5000/api/orders', {
      headers: {
        'Authorization': `Bearer ${token}` // <--- INI BAGIAN PALING PENTING
      }
    })
      .then(res => {
        // Jika status response bukan 2xx (misal: 401, 403, 500), anggap sebagai error
        if (!res.ok) {
          // Coba ambil pesan error dari body json, jika gagal, gunakan status text
          return res.json().then(errData => {
            throw new Error(errData.message || 'Gagal mengambil data pesanan.');
          });
        }
        return res.json();
      })
      .then(data => {
        // Pastikan data adalah array
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          throw new Error('Format data tidak sesuai.');
        }
      })
      .catch(err => {
        // Tangkap semua error
        setError(err.message);
        console.error("Fetch error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  if (error) {
    return <div className="p-8 text-red-500 bg-red-50 rounded-md flex items-center"><ServerCrash className="w-6 h-6 mr-2"/> {error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800">Manajemen Pesanan</h1>
      <div className="mt-8 bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Order Code</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Tanggal Pesan</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.orderCode}</td>
                  <td className="px-6 py-4">{order.customer?.username || 'N/A'}</td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString('id-ID')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">Tidak ada data pesanan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}