const handleErrors = (res, error, customMessage = 'Something went wrong') => {
  res.status(500).json({ message: customMessage, error: error.message });
};

export default handleErrors;
