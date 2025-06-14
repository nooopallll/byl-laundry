// client/app/layout.jsx

import "./globals.css"; // <-- LANGKAH KRITIS #1: Impor file CSS global

export const metadata = {
  title: "ByL Laundry",
  description: "Aplikasi Laundry Modern",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body> {/* <-- LANGKAH KRITIS #2: Halaman dirender di dalam body */}
    </html>
  );
}