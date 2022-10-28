import { Request, Response, NextFunction } from 'express';
import express from 'express';

const router = express.Router();

router.post('/create', AuthController.create, () => {
  
})

export default router;