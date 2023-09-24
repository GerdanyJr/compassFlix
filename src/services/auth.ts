import { app } from "./firebaseConfig";
import * as firebase from 'firebase/auth'
import { createUserWithEmailAndPassword, initializeAuth, updateProfile } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthError {
    message: string,
    code: string
}

const reactNativePersistence = (firebase as any).getReactNativePersistence;

const auth = initializeAuth(app, {
    persistence: reactNativePersistence(ReactNativeAsyncStorage)
});

export async function signUp(email: string, password: string, username: string) {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(response.user, { displayName: username });
    return response.user;
}