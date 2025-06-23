import express from 'express';
import cors from 'cors';

// Route imports
import authRoutes from './routes/authRoutes.js';
import milestoneRoutes from './routes/milestoneRoutes.js';
import tipRoutes from './routes/tipRoutes.js';

const app = express();

app.use(cors()); 
app.use(express.json()); 

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/tips', tipRoutes);


export default app;
