// client/app/admin/layout.jsx

import Sidebar from '@/components/admin/Sidebar'; // Path ini sekarang akan berfungsi karena jsconfig.json

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}