import fs from 'fs';
import path from 'path';

const prepareFilePath = (fileExtension) => {
  const assetsPath = path.join(__dirname, '../assets');
  if (!fs.existsSync(assetsPath)) {
    fs.mkdirSync(assetsPath);
  }
  const filePath = path.join(assetsPath, `${Date.now()}.${fileExtension}`);
  return filePath;
};

export default prepareFilePath;
