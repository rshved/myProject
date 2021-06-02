import CryptoJS from 'crypto-js';
export default function helper () {
  if (localStorage.getItem('token')) {
    const token=localStorage.getItem('token')
    return  JSON.parse(CryptoJS.AES.decrypt(token, 'HuYugADAesHtyEtOtSEcREt8888').toString(CryptoJS.enc.Utf8));
  }
  return null
}
