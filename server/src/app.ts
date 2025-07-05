import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from './shared/middlewares/errorHandler';
import appRoutes from './routes';

const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(appRoutes);

app.use(errorHandler);

export default app;
