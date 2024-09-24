import express from 'express';

import taskRoutes from './Context/task/infraestructure/http/TaskRoutes';
import labelRoutes from './Context/label/infraestructure/http/LabelRoutes';

const app = express();

app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/labels', labelRoutes);

export default app;
