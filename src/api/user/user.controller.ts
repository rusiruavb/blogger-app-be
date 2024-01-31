import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  res.status(200).json({ data: 'create user called' });
});

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ data: 'get user called' });
});

router.put('/', (req: Request, res: Response) => {
  res.status(200).json({ data: 'update user called' });
});

router.delete('/', (req: Request, res: Response) => {
  res.status(200).json({ data: 'delete user called' });
});

export default router;
