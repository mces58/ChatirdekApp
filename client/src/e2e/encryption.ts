import CryptoJS from 'crypto-js';

const createSessionKey = () => {
  try {
    const sessionKey = CryptoJS.lib.WordArray.random(2);
    return sessionKey.toString();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const encryptSessionKey = (sessionKey: string, publicKey: string) => {
  const encrypted = CryptoJS.AES.encrypt(sessionKey, publicKey).toString();
  return encrypted;
};

const decryptSessionKey = (encryptedSessionKey: string, privateKey: string) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedSessionKey, privateKey).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
};

const encryptMessage = (message: string, encryptedSessionKey: string) => {
  const encrypted = CryptoJS.AES.encrypt(message, encryptedSessionKey).toString();
  return encrypted;
};

const decryptMessage = (encryptedMessage: string, decryptedSessionKey: string) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedMessage, decryptedSessionKey).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
};

export {
  createSessionKey,
  encryptMessage,
  decryptMessage,
  encryptSessionKey,
  decryptSessionKey,
};
