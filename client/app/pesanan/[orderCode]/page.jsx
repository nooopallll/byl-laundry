'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

const statusSteps = ["Konfirmasi", "Pick Up", "Proses", "Selesai", "Diantar"];
const statusMapping = {
    ANTREAN: "Konfirmasi",
    PROSES: "Proses",
    SELESAI: "Selesai",
    DIANTAR: "Diantar"
};

export default function StatusPesananPage({ params }) {
  const { orderCode } = params;
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderCode) {
      fetch(`http://localhost:5000/api/orders/${orderCode}`)
        .then(res => res.ok ? res.json() : Promise.reject('Pesanan tidak ditemukan'))
        .then(data => setOrder(data))
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false));
    }
  }, [orderCode]);

  if (isLoading) return <div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 animate-spin text-blue-600" /></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-red-500 text-xl">{error}</p></div>;

  const currentStatusDisplay = statusMapping[order.status] || "Konfirmasi";
  const currentStepIndex = statusSteps.indexOf(currentStatusDisplay);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-12">Status Pesanan Anda</h1>
        <div className="flex justify-between items-center mb-16">
          {statusSteps.map((step, index) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${index <= currentStepIndex ? 'bg-blue-600 border-blue-700 text-white' : 'bg-gray-300 border-gray-400 text-gray-500'}`}>
                <CheckCircle className="w-6 h-6" />
              </div>
              <p className={`mt-2 font-semibold ${index <= currentStepIndex ? 'text-blue-600' : 'text-gray-500'}`}>{step}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">Detail Pesanan</h2>
        </div>
      </div>
    </div>
  );
}