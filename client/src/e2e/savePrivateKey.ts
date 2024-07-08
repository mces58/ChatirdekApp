import * as FileSystem from 'expo-file-system';

const savePrivateKey = async (privateKey: string) => {
  try {
    const fileUri = FileSystem.documentDirectory + 'privateKey.txt';
    await FileSystem.writeAsStringAsync(fileUri, privateKey);
    return fileUri;
  } catch (error) {
    console.log(error);
  }
};

const getPrivateKey = async () => {
  try {
    const fileUri = FileSystem.documentDirectory + 'privateKey.txt';
    const privateKey = await FileSystem.readAsStringAsync(fileUri);

    return privateKey;
  } catch (error) {
    console.log(error);
  }
};

export { savePrivateKey, getPrivateKey };
