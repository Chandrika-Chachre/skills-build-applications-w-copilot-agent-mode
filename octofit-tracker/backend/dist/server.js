"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
mongoose_1.default.connect('mongodb://127.0.0.1:27017/octofit_db')
    .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed', error);
});
