/* 加解密crypto.js插件，使用前需要下包 */

const CryptoJS = require('crypto-js');

const key = CryptoJS.enc.Utf8.parse('A2B0C1D0E5F1A8B3'); // 十六进制数作为密钥，跟前端一直
const iv = CryptoJS.enc.Utf8.parse('3B8A1F5E0D1C0B2A'); // 十六进制数作为密钥偏移量，跟前端一直
const AESUTIL = {
  /* 加密 */
  encrypte: (_content) => {
    const content = CryptoJS.enc.Utf8.parse(_content);
    const encrypted = CryptoJS.AES.encrypt(content, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString().toUpperCase();
  },
  /* 解密 */
  decrypt: (_content) => {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(_content);
    const content = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(content, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
};

module.exports = AESUTIL;
