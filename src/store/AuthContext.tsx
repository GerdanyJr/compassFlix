import { User } from "firebase/auth";
import { createContext, useState } from "react";
import { signOut } from "../services/auth";

export const AuthContext = createContext({
    user: {} as User | null,
    token: '' as string,
    favMovies: [] as number[],
    authenticate: (user: User, token: string) => { },
    isAuthenticated: false,
    setFavMovies: (favMovies: number[]) => { },
    logout: () => { }
});

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);

    function setFavMovies(favMovies: number[]) {
        setFavorites(favMovies);
    }

    function authenticate(user: User, token: string) {
        setToken(token);
        setUser(user);
    }

    function logout() {
        signOut();
        setToken('');
        setUser(null);
    }

    const value = {
        user: user,
        token: token,
        favMovies: favorites,
        setFavMovies: setFavMovies,
        authenticate: authenticate,
        isAuthenticated: !!token,
        logout: logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}