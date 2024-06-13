import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (image) => {
  try {
    const { path } = image;
    const newPath = await cloudinary.uploader.upload(path, {
      folder: 'chat-app',
      transformation: [{ width: 150, height: 150, crop: 'fill' }],
    });

    return newPath.secure_url;
  } catch (error) {
    throw new Error('Error uploading image');
  }
};

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error('Error deleting image');
  }
};

export { uploadImage, deleteImage };
