import * as ImagePicker from 'expo-image-picker';

const openCamera = async (): Promise<string | undefined> => {
  try {
    await ImagePicker.requestCameraPermissionsAsync();

    const result: ImagePicker.ImagePickerResult = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    }
  } catch (error) {
    console.log(error);
  }
};

export default openCamera;
