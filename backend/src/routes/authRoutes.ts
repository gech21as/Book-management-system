import { Router } from 'express';
import { register, login, deleteUser } from '../controllers/authController';
import authenticate from '../middleware/authenticate';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/delete', authenticate, deleteUser);

export default router;
