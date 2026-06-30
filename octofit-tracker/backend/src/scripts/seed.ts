import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';
import { mongoUri } from '../config/database.js';

console.log('Seed the octofit_db database with test data');

const seedData = async () => {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.insertMany([
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

  await Team.insertMany([
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

  await Activity.insertMany([
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

  await LeaderboardEntry.insertMany([
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

  await Workout.insertMany([
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
  await mongoose.disconnect();
};

seedData().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
