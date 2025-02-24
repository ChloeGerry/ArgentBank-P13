import CryptoJS from "crypto-js";

export const decryptToken = (encryptedToken: string, secretKey: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.log("Error when decryting token", error);
  }
};
