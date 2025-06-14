const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// server/controllers/authController.js
exports.register = async (req, res) => {
    const { email, username, password } = req.body;
    try {
      // <-- TAMBAHKAN PENGECEKAN INI
      const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] }
      });
  
      if (existingUser) {
        return res.status(409).json({ message: 'Email atau username sudah digunakan.' });
      }
      // --- Akhir Tambahan ---
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, username, password: hashedPassword },
      });
      res.status(201).json({ message: 'Registrasi berhasil', userId: user.id });
    } catch (error) {
      // Sebaiknya log error di server, dan kirim pesan generik ke klien
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
  };

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login berhasil', token });
  } catch (error) {
    res.status(500).json({ message: 'Login gagal', error: error.message });
  }
};