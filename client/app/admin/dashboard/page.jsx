// client/app/admin/dashboard/page.jsx
'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Package, Wallet, RefreshCw } from 'lucide-react';

// --- DATA CONTOH (MOCK DATA) ---
// Nantinya, data ini akan diambil dari API backend Anda
const statCardsData = [
  { title: "Total Users", value: "89,935", change: "+1.01%", icon: Users, color: "text-blue-500" },
  { title: "Total Products", value: "23,283.5", change: "+0.49%", icon: Package, color: "text-green-500" },
  { title: "Total Orders", value: "46,827", change: "-0.91%", icon: Wallet, color: "text-orange-500" },
  { title: "Refunded", value: "124,854", change: "+1.51%", icon: RefreshCw, color: "text-red-500" },
];

const barChartData = [
  { name: 'Jan', Pendapatan: 4000 }, { name: 'Feb', Pendapatan: 3000 },
  { name: 'Mar', Pendapatan: 59492 }, { name: 'Apr', Pendapatan: 4800 },
  { name: 'May', Pendapatan: 4300 }, { name: 'Jun', Pendapatan: 5400 },
  { name: 'Jul', Pendapatan: 5800 },
];

const pieChartData = [
    { name: 'Offline', value: 400 }, { name: 'Online', value: 300 },
    { name: 'Trade', value: 300 },
];
const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const recentOrders = [
    { id: '#12594', date: 'Oct 15, 2023', customer: 'Frank Murlo', amount: '$847.69', status: 'New Order' },
    { id: '#12490', date: 'Nov 15, 2021', customer: 'Thomas Bleir', amount: '$477.14', status: 'On Delivery' },
    { id: '#12306', date: 'Nov 02, 2021', customer: 'Bill Norton', amount: '$477.14', status: 'On Delivery' },
];
// --- AKHIR DATA CONTOH ---

// Komponen untuk kartu statistik
const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className={`text-xs ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
      </div>
      <div className={`p-2 rounded ${color.replace('text-', 'bg-').replace('-500', '-100')}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  </div>
);

// Komponen utama halaman Dashboard
export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-full">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Bagian Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCardsData.map(card => <StatCard key={card.title} {...card} />)}
      </div>

      {/* Bagian Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Orders Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip wrapperClassName="!border-gray-300 !rounded-lg" />
              <Legend />
              <Bar dataKey="Pendapatan" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Earnings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieChartData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Bagian Daftar Pesanan Terbaru */}
       <div className="bg-white p-6 rounded-lg shadow">
         <h3 className="font-bold text-lg mb-4">Order List</h3>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Customer Name</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Status Order</th>
                    </tr>
                </thead>
                <tbody>
                    {recentOrders.map((order) => (
                        <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                            <td className="px-6 py-4">{order.date}</td>
                            <td className="px-6 py-4">{order.customer}</td>
                            <td className="px-6 py-4">{order.amount}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    order.status === 'New Order' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {order.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
       </div>
    </div>
  );
}