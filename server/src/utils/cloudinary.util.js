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
      folder: 'CHATIRDEK/images',
      resource_type: 'image',
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Error uploading image');
  }
};

const uploadSound = async (soundPath) => {
  try {
    const result = await cloudinary.uploader.upload(soundPath, {
      folder: 'CHATIRDEK/sounds',
      resource_type: 'video',
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Error uploading sound');
  }
};

export { uploadImage, uploadSound };
