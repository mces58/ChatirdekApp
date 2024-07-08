import { JSEncrypt } from 'jsencrypt';

const createPairKey = async () => {
  try {
    const encrypt = new JSEncrypt({ default_key_size: '128' });
    const publicKey = encrypt.getPublicKey();
    const privateKey = encrypt.getPrivateKey();

    return {
      publicKey,
      privateKey,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default createPairKey;
