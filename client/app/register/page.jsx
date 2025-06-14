// client/app/register/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Registrasi gagal');
      }

      setSuccess('Registrasi berhasil! Anda akan diarahkan ke halaman login.');
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Buat Akun Baru</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <input
              id="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
          <div>
            <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Register
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}