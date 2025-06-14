const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// [GET] /api/orders - (Admin) Mengambil semua pesanan
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { customer: { select: { username: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data pesanan", error: error.message });
  }
};

// [PUT] /api/orders/:id/status - (Admin) Memperbarui status pesanan
exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedOrder = await prisma.order.update({
            where: { id: id },
            data: { status: status },
        });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui status", error: error.message });
    }
};

// [GET] /api/orders/:orderCode - (Publik) Mengambil satu pesanan berdasarkan kode uniknya
exports.getOrderByCode = async (req, res) => {
  const { orderCode } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { orderCode },
    });
    if (!order) return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data pesanan', error: error.message });
  }
};

// [GET] /api/orders/myorders - (Pelanggan Terproteksi) Mengambil riwayat pesanan milik sendiri
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { customerId: req.userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil riwayat pesanan', error: error.message });
  }
};