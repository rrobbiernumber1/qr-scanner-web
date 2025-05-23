import CryptoJS from 'crypto-js';

// 암호화 키 (실제 환경에서는 환경변수로 관리해야 함)
const SECRET_KEY = 'qr-scanner-secret-key-2024';

/**
 * QR 데이터를 AES로 암호화
 * @param {string} data - 암호화할 데이터
 * @returns {string} 암호화된 데이터
 */
export const encryptData = (data) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error('암호화 실패:', error);
    throw new Error('데이터 암호화에 실패했습니다.');
  }
};

/**
 * 암호화된 데이터를 복호화
 * @param {string} encryptedData - 암호화된 데이터
 * @returns {string} 복호화된 데이터
 */
export const decryptData = (encryptedData) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('복호화 실패:', error);
    throw new Error('데이터 복호화에 실패했습니다.');
  }
};