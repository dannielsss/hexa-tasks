import session from 'express-session';
import passport from 'passport';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import taskRoutes from './Context/task/infraestructure/http/TaskRoutes';
import labelRoutes from './Context/label/infraestructure/http/LabelRoutes';
import authRoutes from './Context/auth/infraestructure/http/AuthRoutes';

import './Context/auth/infraestructure/strategies/LocalStrategy';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: '1234',
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.session());

app.use(morgan('tiny'));
app.use(cors());

app.use('/api/tasks', taskRoutes);
app.use('/api/labels', labelRoutes);
app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'dist')));

export default app;
