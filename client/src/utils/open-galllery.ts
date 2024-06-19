import * as ImagePicker from 'expo-image-picker';

const openGallery = async (): Promise<string | undefined> => {
  try {
    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const base64: string = `data:image/jpg;base64,${result.assets[0].base64}`;
      return base64;
    }
  } catch (error) {
    console.log(error);
  }
};

export default openGallery;
