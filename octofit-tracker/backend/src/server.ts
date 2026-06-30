import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';
import { connectToDatabase } from './config/database.js';

const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const createCollectionRouter = (resourceName: string, model: mongoose.Model<any>) => {
  const router = express.Router();

  router.get('/', async (_req, res) => {
    const items = await model.find({});
    res.json({ resource: resourceName, items, count: items.length, apiBaseUrl });
  });

  router.post('/', async (req, res) => {
    const item = await model.create(req.body);
    res.status(201).json(item);
  });

  return router;
};

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', createCollectionRouter('users', User));
app.use('/api/teams', createCollectionRouter('teams', Team));
app.use('/api/activities', createCollectionRouter('activities', Activity));
app.use('/api/leaderboard', createCollectionRouter('leaderboard', LeaderboardEntry));
app.use('/api/workouts', createCollectionRouter('workouts', Workout));

connectToDatabase()
  .then(() => {
    console.log('MongoDB connected');
  })
  .then(() => {
    app.listen(port, host, () => {
      console.log(`Backend listening on ${host}:${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
  });
