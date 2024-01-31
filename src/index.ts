import 'dotenv/config';
import express, { Request, Response, Application } from 'express';
import prisma from './prisma/prisma.client';

async function main() {
  await prisma.$connect();
  console.log('Database Connected');
  const app: Application = express();
  const port = process.env.PORT || 8088;

  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({ version: 'v1.0.0', name: 'Blogger API' });
  });

  app.listen(port, () => {
    console.log(`Blogger API is running on http://localhost:${port}`);
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
