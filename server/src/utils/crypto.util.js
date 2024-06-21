import CryptoJS from 'crypto-js';

const encryptionKey = 'buG1ZUwGlyK3yF0rEncrypT10n';

const encrypt = (message) => {
  const encrypted = CryptoJS.AES.encrypt(message, encryptionKey).toString();
  return encrypted;
};

const decrypt = (encryptedMessage) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedMessage, encryptionKey).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
};

export { encrypt, decrypt };
