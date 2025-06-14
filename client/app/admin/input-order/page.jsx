'use client';
import { useState } from 'react';
// Anda bisa menambahkan import lain jika diperlukan, misalnya useRouter untuk redirect
// import { useRouter } from 'next/navigation';

export default function InputOrderPage() {
  // Gunakan state untuk menampung nilai dari setiap input
  const [customerName, setCustomerName] = useState('');
  const [serviceType, setServiceType] = useState('REGULER');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Di sini Anda akan menambahkan logika untuk mengirim data ke API backend
    // Untuk saat ini, kita hanya akan menampilkannya di console
    console.log({
      customerName,
      serviceType,
      weight,
      notes,
    });

    // Contoh logika API (belum diimplementasikan):
    try {
      const token = localStorage.getItem('laundry_token');
      const res = await fetch('http://localhost:5000/api/orders/create', { // Asumsi ada rute ini
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ customerName, serviceType, weight: parseFloat(weight), notes }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Gagal membuat pesanan');
      }

      setSuccess('Pesanan baru berhasil dibuat!');
      // Reset form
      setCustomerName('');
      setServiceType('REGULER');
      setWeight('');
      setNotes('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Form Pesanan Baru</h1>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        {/* --- AWAL PERUBAHAN --- */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Nama Pelanggan */}
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
              Nama Pelanggan
            </label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Pilihan Jenis Layanan */}
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
              Jenis Layanan
            </label>
            <select
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="REGULER">Reguler (3 Hari)</option>
              <option value="SATUAN">Satuan</option>
              <option value="EKSPRESS">Ekspress (5 Jam)</option>
            </select>
          </div>

          {/* Input Berat */}
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Berat (kg)
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              step="0.1"
              placeholder="Contoh: 4.5"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Input Catatan */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Catatan (Opsional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: Jangan gunakan pelembut pakaian"
            ></textarea>
          </div>

          {/* Pesan Error atau Sukses */}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          {/* Tombol Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Simpan Pesanan
            </button>
          </div>
        </form>
         {/* --- AKHIR PERUBAHAN --- */}
      </div>
    </div>
  );
}