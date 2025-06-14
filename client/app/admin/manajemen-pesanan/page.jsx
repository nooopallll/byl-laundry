'use client';
import { useState, useEffect } from 'react';

export default function ManajemenPesanan() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json()).then(data => setOrders(data));
  }, []);
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800">Manajemen Pesanan</h1>
      <div className="mt-8 bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
        </table>
      </div>
    </div>
  );
}