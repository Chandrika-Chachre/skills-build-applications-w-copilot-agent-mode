import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

mongoose.connect('mongodb://127.0.0.1:27017/octofit_db')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
  });
