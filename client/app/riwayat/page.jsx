'use client';
import { useState, useEffect } from 'react';
import { Loader2, ServerCrash } from 'lucide-react';

export default function RiwayatPesananPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('laundry_token');
    if (!token) {
      setError('Anda harus login untuk melihat halaman ini.');
      setIsLoading(false);
      return;
    }
    fetch('http://localhost:5000/api/orders/myorders', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.ok ? res.json() : Promise.reject('Gagal mengambil data.'))
      .then(data => setOrders(data))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 animate-spin text-blue-600" /></div>;
  
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Riwayat Pesanan Saya</h1>
        {error && <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>}
        {!error && orders.length === 0 && !isLoading && <div>Belum ada riwayat pesanan.</div>}
        {!error && orders.length > 0 && <div className="bg-white rounded-lg shadow-md overflow-x-auto"></div>}
      </div>
    </div>
  );
}