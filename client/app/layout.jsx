// client/app/layout.jsx

import "./globals.css"; // <-- HAPUS TANDA KOMENTAR DI SINI

export const metadata = {
  title: "ByL Laundry",
  description: "Aplikasi Laundry Modern",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}