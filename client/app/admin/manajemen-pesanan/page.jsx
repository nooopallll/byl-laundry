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
      <table className="w-full text-sm text-left text-gray-500">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
    <tr>
      <th className="px-6 py-3">Order Code</th>
      <th className="px-6 py-3">Customer</th>
      <th className="px-6 py-3">Status</th>
      <th className="px-6 py-3">Created At</th>
    </tr>
  </thead>
  <tbody>
    {orders.map(order => (
      <tr key={order.id} className="bg-white border-b">
        <td className="px-6 py-4 font-medium">{order.orderCode}</td>
        <td className="px-6 py-4">{order.customer.username}</td>
        <td className="px-6 py-4">{order.status}</td>
        <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
      </tr>
    ))}
  </tbody>
</table>
      </div>
    </div>
  );
}