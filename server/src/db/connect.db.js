import mongoose from 'mongoose';

import dotEnvConfig from 'src/configs/dotEnv.config';
import logger from 'src/utils/logger.util';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(dotEnvConfig.DATABASE_URI);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error(error);
  }
};

export default connectToMongoDB;
