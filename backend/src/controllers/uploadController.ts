import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';

const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads');

export const handleUpload = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const file = req.file as Express.Multer.File;
  const url = `/uploads/${file.filename}`;
  res.json({ url, filename: file.filename });
};

export const ensureUploadDir = () => {
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
};
