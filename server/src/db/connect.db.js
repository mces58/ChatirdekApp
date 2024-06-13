import mongoose from 'mongoose';

import dotEnvConfig from 'src/configs/dotEnv.config';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(dotEnvConfig.DATABASE_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

export default connectToMongoDB;
