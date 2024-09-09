import express from 'express';

import taskRoutes from './Context/task/infraestructure/http/TaskRoutes';

const app = express();

app.use(express.json());

app.use('/api/tasks', taskRoutes);

export default app;
