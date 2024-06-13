import fs from 'fs';

const removeLocalImage = (path) => {
  fs.unlink(path, (error) => {
    if (error) {
      throw new Error('Error deleting image');
    }
  });
};

export default removeLocalImage;
