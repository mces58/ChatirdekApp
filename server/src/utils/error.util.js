import logger from 'src/utils/logger.util';

const handleErrors = (res, error, customMessage = 'Something went wrong') => {
  res.status(500).json({ message: customMessage, error: error.message });
  logger.error(error);
};

export default handleErrors;
