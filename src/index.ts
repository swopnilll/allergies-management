import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';

import { router } from './routes/router';

import { notFound } from './middlware/notFound';
import { errorHandler } from './middlware/errorHandler';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT ||  3004;

app.listen(PORT, () => console.log("server is running on " +PORT));