import { Router } from 'express';
import { userRouter } from './user-routes.js';
// import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

router.use('/users', userRouter);

// router.post('/users/register')
// router.post('users/login')
// router.get('/me', authenticateToken)
// router.put('/update', authenticateToken)
export default router;
