import { Request, Response, NextFunction } from 'express';

export default function validateBook(req: Request, res: Response, next: NextFunction) {
  const { title, author, pages, institution, category } = req.body as any;

  const errors: string[] = [];
  if (!title || typeof title !== 'string' || title.trim().length === 0) errors.push('title is required');
  if (!author || typeof author !== 'string' || author.trim().length === 0) errors.push('author is required');
  if (!institution || typeof institution !== 'string' || institution.trim().length === 0) errors.push('institution is required');
  if (!category || typeof category !== 'string' || category.trim().length === 0) errors.push('category is required');
  if (pages !== undefined) {
    const p = Number(pages);
    if (!Number.isFinite(p) || p <= 0) errors.push('pages must be a positive number');
  }

  if (errors.length) return res.status(400).json({ message: 'Invalid book payload', errors });
  next();
}
