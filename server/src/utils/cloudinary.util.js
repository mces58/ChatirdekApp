import { v2 as cloudinary } from 'cloudinary';

import dotEnvConfig from 'src/configs/dotEnv.config';

cloudinary.config({
  cloud_name: dotEnvConfig.CLOUDINARY.CLOUDNAME,
  api_key: dotEnvConfig.CLOUDINARY.APIKEY,
  api_secret: dotEnvConfig.CLOUDINARY.APISECRET,
});

const uploadImage = async (image) => {
  try {
    const { path } = image;
    const newPath = await cloudinary.uploader.upload(path, {
      folder: 'CHATIRDEK',
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
