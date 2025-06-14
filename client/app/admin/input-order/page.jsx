'use client';
export default function InputOrderPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Form Pesanan Baru</h1>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <form onSubmit={handleSubmit}></form>
      </div>
    </div>
  );
}