import { get, getDatabase, ref, set, update } from "firebase/database";
import { app } from "./firebaseConfig";
import { User } from "firebase/auth";

const database = getDatabase(app);

export async function createUserOnDatabase(user: User) {
    await set(ref(database, `users/${user.uid}`), {
        favMovies: []
    });
}

export async function addFavorite(user: User) {
    const id = '84';
    const response = await get(ref(database, `/users/${user.uid}/favMovies`));
    const prevFavs = response.val() ? response.val() : [];
    await update(ref(database, `/users/${user.uid}`), {
        favMovies: [...prevFavs, id]
    });
}

export async function removeFavorite(user: User) {
    const id = '25';
    const response = await get(ref(database, `/users/${user.uid}/favMovies`));
    const prevFavs = response.val() ? response.val() : [];
    await update(ref(database, `/users/${user.uid}`), {
        favMovies: prevFavs.filter((fav: string) => fav !== id)
    });
}