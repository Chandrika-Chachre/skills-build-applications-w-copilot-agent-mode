"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_js_1 = require("../models.js");
const database_js_1 = require("../config/database.js");
console.log('Seed the octofit_db database with test data');
const seedData = async () => {
    await mongoose_1.default.connect(database_js_1.mongoUri);
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        models_js_1.User.deleteMany({}),
        models_js_1.Team.deleteMany({}),
        models_js_1.Activity.deleteMany({}),
        models_js_1.LeaderboardEntry.deleteMany({}),
        models_js_1.Workout.deleteMany({})
    ]);
    const users = await models_js_1.User.insertMany([
        {
            name: 'Alex Rivera',
            email: 'alex@example.com',
            age: 29,
            fitnessGoal: 'Marathon prep',
            city: 'Austin'
        },
        {
            name: 'Priya Sharma',
            email: 'priya@example.com',
            age: 31,
            fitnessGoal: 'Strength training',
            city: 'Denver'
        },
        {
            name: 'Jordan Kim',
            email: 'jordan@example.com',
            age: 27,
            fitnessGoal: 'Weight loss',
            city: 'Seattle'
        }
    ]);
    await models_js_1.Team.insertMany([
        {
            name: 'Night Owls',
            sport: 'Running',
            members: users.slice(0, 2).map((user) => user.name),
            captain: users[0].name
        },
        {
            name: 'Peak Performers',
            sport: 'CrossFit',
            members: [users[2].name],
            captain: users[2].name
        }
    ]);
    await models_js_1.Activity.insertMany([
        {
            userName: users[0].name,
            type: 'Run',
            distanceKm: 8.4,
            durationMinutes: 42,
            caloriesBurned: 540
        },
        {
            userName: users[1].name,
            type: 'Cycling',
            distanceKm: 15,
            durationMinutes: 60,
            caloriesBurned: 430
        },
        {
            userName: users[2].name,
            type: 'HIIT',
            distanceKm: 0,
            durationMinutes: 25,
            caloriesBurned: 310
        }
    ]);
    await models_js_1.LeaderboardEntry.insertMany([
        {
            name: users[0].name,
            totalScore: 1280,
            streakDays: 12
        },
        {
            name: users[1].name,
            totalScore: 1140,
            streakDays: 9
        },
        {
            name: users[2].name,
            totalScore: 1010,
            streakDays: 6
        }
    ]);
    await models_js_1.Workout.insertMany([
        {
            name: 'HIIT Interval',
            category: 'Cardio',
            durationMinutes: 20,
            difficulty: 'Intermediate',
            focusArea: 'Endurance',
            description: 'Short bursts of high-intensity effort with active recovery.'
        },
        {
            name: 'Core Sculpt',
            category: 'Strength',
            durationMinutes: 25,
            difficulty: 'Beginner',
            focusArea: 'Abs',
            description: 'A focused core routine to improve stability.'
        }
    ]);
    console.log('Seed data inserted successfully');
    await mongoose_1.default.disconnect();
};
seedData().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
