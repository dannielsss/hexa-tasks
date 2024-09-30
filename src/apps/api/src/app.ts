import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import taskRoutes from './Context/task/infraestructure/http/TaskRoutes';
import labelRoutes from './Context/label/infraestructure/http/LabelRoutes';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.use('/api/tasks', taskRoutes);
app.use('/api/labels', labelRoutes);

export default app;
