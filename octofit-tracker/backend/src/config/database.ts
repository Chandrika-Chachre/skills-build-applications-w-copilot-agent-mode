import mongoose from 'mongoose';

export const mongoUri = 'mongodb://127.0.0.1:27017/octofit_db';

export const connectToDatabase = async () => {
  await mongoose.connect(mongoUri);
};

export default mongoUri;
