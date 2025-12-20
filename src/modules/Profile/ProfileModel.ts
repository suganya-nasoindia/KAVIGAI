// ProfileModel.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStoredUserId = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('USER_ID');
};
