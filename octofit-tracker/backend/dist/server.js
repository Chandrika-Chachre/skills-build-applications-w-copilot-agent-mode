"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const models_js_1 = require("./models.js");
const database_js_1 = require("./database.js");
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const createCollectionRouter = (resourceName, model) => {
    const router = express_1.default.Router();
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
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl });
});
app.use('/api/users', createCollectionRouter('users', models_js_1.User));
app.use('/api/teams', createCollectionRouter('teams', models_js_1.Team));
app.use('/api/activities', createCollectionRouter('activities', models_js_1.Activity));
app.use('/api/leaderboard', createCollectionRouter('leaderboard', models_js_1.LeaderboardEntry));
app.use('/api/workouts', createCollectionRouter('workouts', models_js_1.Workout));
(0, database_js_1.connectToDatabase)()
    .then(() => {
    console.log('MongoDB connected');
})
    .then(() => {
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed', error);
});
