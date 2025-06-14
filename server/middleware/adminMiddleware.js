const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const admin = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      // Ambil data user dari database untuk memastikan role-nya
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

      if (user && user.role === 'ADMIN') {
        req.userId = decoded.userId; // atau req.user = user;
        next();
      } else {
        res.status(403).json({ message: 'Akses ditolak. Peran Admin diperlukan.' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Tidak terotorisasi, token gagal' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token' });
  }
};

module.exports = { admin };