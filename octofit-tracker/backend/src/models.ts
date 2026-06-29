import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  fitnessGoal: String,
  city: String,
  joinedAt: { type: Date, default: Date.now }
});

const teamSchema = new Schema({
  name: { type: String, required: true },
  sport: String,
  members: [{ type: String }],
  captain: String,
  createdAt: { type: Date, default: Date.now }
});

const activitySchema = new Schema({
  userName: { type: String, required: true },
  type: { type: String, required: true },
  distanceKm: Number,
  durationMinutes: Number,
  caloriesBurned: Number,
  completedAt: { type: Date, default: Date.now }
});

const leaderboardSchema = new Schema({
  name: { type: String, required: true },
  totalScore: { type: Number, required: true },
  streakDays: Number,
  updatedAt: { type: Date, default: Date.now }
});

const workoutSchema = new Schema({
  name: { type: String, required: true },
  category: String,
  durationMinutes: Number,
  difficulty: String,
  focusArea: String,
  description: String
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
