import { get, getDatabase, ref, set, update } from "firebase/database";
import { app } from "./firebaseConfig";
import { User } from "firebase/auth";

const database = getDatabase(app);

export async function createUserOnDatabase(user: User) {
    await set(ref(database, `users/${user.uid}`), {
        favMovies: []
    });
}

export async function getFavMovies(user: User) {
    const response = await get(ref(database, `/users/${user.uid}/favMovies`));
    const favs = response.val() ? response.val() : [];
    return favs;
}

export async function toggleFavorite(user: User, favMovies: number[], movieId: number) {
    const newFavs = toggleItem(favMovies, movieId);
    await update(ref(database, `/users/${user.uid}`), {
        favMovies: newFavs
    });
    return newFavs;
}

function toggleItem(items: number[], id: number) {
    if (items.includes(id)) {
        return items.filter(items => items !== id);
    } else {
        return [...items, id];
    }
}