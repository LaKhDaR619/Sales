import ECEncryption from 'react-native-ec-encryption';

export function encrypt(text) {
  return new Promise(async (resolve, reject) => {
    try {
      //Encrypt
      const cipherText = await ECEncryption.encrypt({
        data: text,
        label: '0x5Cc5dc62be3c95C771C51234e1858B398265deF', //any identical string
      });

      resolve(cipherText);
    } catch (err) {
      console.log(err.message);
      reject(err);
    }
  });
}

export function decrypt(hashedText) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(hashedText);

      //Decrypt
      const clearText = await ECEncryption.decrypt({
        data: hashedText,
        label: '0x5Cc5dc62be3c95C771C51234e1858B398265deF', //the same identical string
      });

      resolve(clearText);
    } catch (err) {
      console.log(err.message);
      reject(err);
    }
  });
}

export function compare(text, hashedText) {
  return new Promise(async (resolve, reject) => {
    try {
      //Decrypt
      const clearText = await ECEncryption.decrypt({
        data: hashedText,
        label: '0x5Cc5dc62be3c95C771C51234e1858B398265deF', //the same identical string
      });

      resolve(clearText == text);
    } catch (err) {
      console.log(err.message);
      reject(err);
    }
  });
}
