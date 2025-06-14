// client/components/admin/Sidebar.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, PlusSquare, UserCheck } from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/manajemen-pesanan', label: 'Manajemen Pesanan', icon: ShoppingCart },
  { href: '/admin/input-order', label: 'Input Order', icon: PlusSquare },
  { href: '/admin/presensi', label: 'Presensi', icon: UserCheck },
];

// Pastikan Anda menggunakan 'export default' pada fungsi komponen
export default function Sidebar() {
  const pathname = usePathname();
  
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="h-20 flex items-center justify-center bg-gray-900">
        <h1 className="text-2xl font-bold">AESYS</h1>
      </div>
      <nav className="flex-grow px-4 py-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.label} className="mb-2">
              <Link href={item.href} legacyBehavior>
                <a className={`flex items-center p-3 rounded-lg transition-colors ${
                  pathname === item.href ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}