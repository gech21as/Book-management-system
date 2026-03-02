import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export default async function requireAdmin(req: Request & { user?: any }, res: Response, next: NextFunction) {
  try {
    // Debug: Log authentication details
    console.log('=== Admin Middleware Debug ===');
    console.log('Request User:', req.user);
    console.log('Request Headers:', req.headers);
    console.log('Authorization Header:', req.headers.authorization);
    
    if (!req.user) {
      console.log('No user found in request');
      return res.status(401).json({ message: 'Unauthorized: No user data' });
    }
    
    if (!req.user.role || req.user.role !== 'admin') {
      console.log('User role is not admin:', req.user.role);
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
    
    console.log('Admin access granted for user:', req.user.email);
    next();
  } catch (err) {
    console.log('Middleware error:', err);
    next(err);
  }
}
