import { v2 as cloudinary } from 'cloudinary';

import dotEnvConfig from 'src/configs/dotEnv.config';

cloudinary.config({
  cloud_name: dotEnvConfig.CLOUDINARY.CLOUDNAME,
  api_key: dotEnvConfig.CLOUDINARY.APIKEY,
  api_secret: dotEnvConfig.CLOUDINARY.APISECRET,
});

const uploadImage = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'CHATIRDEK',
      resource_type: 'image',
    });
    return result.secure_url;
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
