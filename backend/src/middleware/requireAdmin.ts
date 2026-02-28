import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export default async function requireAdmin(req: Request & { user?: any }, res: Response, next: NextFunction) {
  try {
    const uid = req.user?.id;
    if (!uid) return res.status(401).json({ message: 'Unauthorized' });
    const user = await User.findById(uid).lean();
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    if (user.role !== 'admin') return res.status(403).json({ message: 'Forbidden: admin only' });
    // attach user to request for downstream
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
