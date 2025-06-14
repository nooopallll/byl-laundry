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

exports.createOrder = async (req, res) => {
  // Ambil data dari body request yang dikirim frontend
  const { customerName, serviceType, weight, notes } = req.body;

  // Validasi input dasar
  if (!customerName || !serviceType || !weight) {
    return res.status(400).json({ message: 'Nama pelanggan, tipe layanan, dan berat wajib diisi.' });
  }

  try {
    // Cari customer berdasarkan nama.
    // PENTING: Untuk aplikasi nyata, lebih baik mencari berdasarkan ID unik customer.
    // Ini adalah penyederhanaan.
    let customer = await prisma.user.findFirst({
      where: { username: customerName, role: 'PELANGGAN' }, // Asumsi customer memiliki role 'PELANGGAN'
    });

    // Jika customer tidak ada, buat customer baru
    if (!customer) {
        // Ini adalah contoh sederhana, Anda mungkin perlu password default atau cara lain
        const randomPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
        customer = await prisma.user.create({
            data: {
                username: customerName,
                email: `${customerName.replace(/\s+/g, '')}@example.com`, // Email dummy
                password: randomPassword,
                role: 'PELANGGAN',
            }
        });
    }

    // Buat kode pesanan yang unik
    const orderCode = `BYL-${Date.now()}`;
    
    // Hitung total harga (asumsi sederhana, misal Rp 8.000/kg)
    const pricePerKg = 8000;
    const totalPrice = parseFloat(weight) * pricePerKg;

    // Simpan pesanan ke database
    const newOrder = await prisma.order.create({
      data: {
        orderCode,
        customerId: customer.id,
        serviceType,
        weight: parseFloat(weight),
        totalPrice,
        notes,
        status: 'ANTREAN', // Status awal saat order dibuat
      },
    });

    res.status(201).json({ message: 'Pesanan berhasil dibuat', order: newOrder });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: 'Gagal membuat pesanan', error: error.message });
  }
};