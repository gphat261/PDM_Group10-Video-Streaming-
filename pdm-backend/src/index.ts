import express from 'express';
import cors from 'cors';
import path from 'path';
import { PORT } from './config/env';
import authRoutes from './routes/auth.routes';
import videoRoutes from './routes/video.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/hls', express.static(path.join(__dirname, '../uploads/hls')));
app.use('/thumbnails', express.static(path.join(__dirname, '../uploads/thumbnails')));

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'PDM Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
