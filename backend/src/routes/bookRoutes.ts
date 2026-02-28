import { Router } from 'express';
import { listBooks, getBook, createBook, updateBook, deleteBook } from '../controllers/bookController';
import authenticate from '../middleware/authenticate';
import requireAdmin from '../middleware/requireAdmin';
import validateBook from '../middleware/validateBook';

const router = Router();

router.get('/', listBooks);
router.get('/:id', getBook);
// Mutating operations require admin
router.post('/', authenticate, requireAdmin, validateBook, createBook);
router.put('/:id', authenticate, requireAdmin, validateBook, updateBook);
router.delete('/:id', authenticate, requireAdmin, deleteBook);

export default router;
