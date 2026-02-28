import { Request, Response } from 'express';
import Book from '../models/Book';

const mapDoc = (doc: any) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

export const listBooks = async (_req: Request, res: Response) => {
  const books = await Book.find().sort({ createdAt: -1 }).lean();
  const mapped = books.map((b: any) => {
    b.id = b._id;
    delete b._id;
    delete b.__v;
    return b;
  });
  res.json(mapped);
};

export const getBook = async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id).lean();
  if (!book) return res.status(404).json({ message: 'Book not found' });
  book.id = book._id;
  delete book._id;
  delete book.__v;
  res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
  const data = req.body;
  const book = new Book(data);
  await book.save();
  res.status(201).json(mapDoc(book));
};

export const updateBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(mapDoc(book));
};

export const deleteBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ ok: true });
};
