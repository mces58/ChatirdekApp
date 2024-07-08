import * as ImagePicker from 'expo-image-picker';

const openCamera = async (): Promise<{ uri: string; base64: string } | undefined> => {
  try {
    await ImagePicker.requestCameraPermissionsAsync();

    const result: ImagePicker.ImagePickerResult = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const base64: string = `data:image/jpg;base64,${result.assets[0].base64}`;
      return {
        uri: result.assets[0].uri,
        base64,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export default openCamera;
