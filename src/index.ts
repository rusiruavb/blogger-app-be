import 'dotenv/config';
import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import api from './api';
import { errorMiddleware } from './middleware/error.middlewarre';

const port = process.env.PORT || 8088;
const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ version: 'v1.0.0', name: 'Blogger API' });
});

app.use('/api', api);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Blogger API is running on http://localhost:${port}`);
});
