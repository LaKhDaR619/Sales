import AsyncStorage from '@react-native-community/async-storage';

export const storeString = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@${key}`, value);
  } catch (e) {
    // saving error
    console.log(e.message);
  }
};

export const storeObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${key}`, jsonValue);
  } catch (e) {
    // saving error
    console.log(e.message);
  }
};

export const getString = async key => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    return value;
  } catch (e) {
    // error reading value
    console.log(e.message);
  }
};

export const getObject = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e.message);
  }
};

export const remove = async key => {
  try {
    await AsyncStorage.removeItem(`@${key}`);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
