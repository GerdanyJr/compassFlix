import { app } from "./firebaseConfig";
import * as firebase from 'firebase/auth'
import { createUserWithEmailAndPassword, initializeAuth, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFavMovies } from "./database";

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

export async function login(email: string, password: string) {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const favMovies = await getFavMovies(response.user);
    return [response, favMovies];
}

export async function signOut() {
    await firebase.signOut(auth);
}