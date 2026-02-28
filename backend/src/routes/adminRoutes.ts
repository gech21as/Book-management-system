import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Book from '../models/Book';
import { seedBooks } from '../data/seedBooks';

const router = Router();

router.post('/seed', async (req, res) => {
  try {
    // optional seed key protection
    const seedKeyEnv = process.env.SEED_KEY;
    if (seedKeyEnv) {
      const provided = req.body.seedKey;
      if (!provided || provided !== seedKeyEnv) return res.status(403).json({ message: 'Missing or invalid seed key' });
    }
    // create admin user if not exists
    const adminEmail = req.body.email || process.env.SEED_ADMIN_EMAIL || 'admin@local';
    const adminPassword = req.body.password || process.env.SEED_ADMIN_PASSWORD || 'Admin123!';

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const hashed = await bcrypt.hash(adminPassword, 10);
      admin = new User({ name: 'Administrator', email: adminEmail, password: hashed, role: 'admin' });
      await admin.save();
    } else {
      // If the user already exists but isn't an admin, upgrade to admin
      if (admin.role !== 'admin') {
        admin.role = 'admin';
        await admin.save();
      }
    }

    // seed books
    const existing = await Book.countDocuments();
    if (existing === 0) {
      await Book.insertMany(seedBooks);
    }

    res.json({ ok: true, admin: { email: admin.email }, seededBooks: existing === 0 });
  } catch (err) {
    res.status(500).json({ message: 'Seeding failed', err });
  }
});

export default router;
