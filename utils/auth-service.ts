import * as SecureStore from 'expo-secure-store';

export const saveToken = async (token: string): Promise<void> => {
    await SecureStore.setItemAsync('access-token', token);
}

export const getToken = async (): Promise<string | null> => {
    const token = await SecureStore.getItemAsync('access-token');
    return token;
}

export const removeToken = async (): Promise<void> => {
    await SecureStore.deleteItemAsync('access-token');
}