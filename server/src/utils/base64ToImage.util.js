import fs from 'fs';

const base64ToImage = (base64String, path) => {
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(path, buffer);
  return path;
};

const base64ToSound = (base64String, path) => {
  const base64Data = base64String.replace(/^data:audio\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(path, buffer);
  return path;
};

export { base64ToImage, base64ToSound };
