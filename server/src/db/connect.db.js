import mongoose from 'mongoose';

import dotEnvConfig from 'src/configs/dotEnv.config';
import logger from 'src/utils/logger.util';

const connectToMongoDB = () => {
  const reconnectTimeout = 5000;

  mongoose.Promise = global.Promise;
  const db = mongoose.connection;

  const connect = async () => {
    mongoose.connect(dotEnvConfig.DATABASE_URI);
  };

  db.on('connected', () => {
    logger.info('Connected to MongoDB!');
  });

  db.on('error', (error) => {
    logger.error(`MongoDB connection error: ${error}`);
    mongoose.disconnect();
  });

  db.once('open', () => {
    logger.info('MongoDB connection opened!');
  });

  db.on('reconnected', () => {
    logger.info('MongoDB reconnected!');
  });

  db.on('disconnected', () => {
    logger.error(`MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
    setTimeout(connect, reconnectTimeout);
  });

  connect();
};

export default connectToMongoDB;
