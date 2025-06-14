'use client';
import { useState } from 'react';
export default function PresensiPage() {
  const [checkInData, setCheckInData] = useState(null);
  const handleCheckIn = () => setCheckInData(new Date());
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Presensi Karyawan</h1>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
        {!checkInData ? <button onClick={handleCheckIn}>CHECK-IN</button> : <div>Checked In</div>}
      </div>
    </div>
  );
}