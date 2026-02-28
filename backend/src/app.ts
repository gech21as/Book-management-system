import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';
import adminRoutes from './routes/adminRoutes';
import multer from 'multer';
import { ensureUploadDir } from './controllers/uploadController';

// prepare upload directory
ensureUploadDir();
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (_req: Request, file: any, cb: (err: Error | null, acceptFile?: boolean) => void) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif'
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Unsupported file type'));
  }
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/admin', adminRoutes);

// upload endpoint (admin should restrict in production)
import requireAdmin from './middleware/requireAdmin';
import { handleUpload } from './controllers/uploadController';
app.post('/api/uploads', upload.single('file'), requireAdmin, handleUpload);

// serve uploaded files
app.use('/uploads', require('express').static('uploads'));

app.get('/', (req, res) => res.json({ ok: true }));

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

export default app;
