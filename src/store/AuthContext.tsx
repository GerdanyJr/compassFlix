import { User } from "firebase/auth";
import { createContext, useState } from "react";
import { signOut } from "../services/auth";

export const AuthContext = createContext({
    user: {} as User | null,
    token: '' as String,
    authenticate: (user: User, token: string) => { },
    isAuthenticated: false,
    logout: () => { }
});

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<String>('');
    const [user, setUser] = useState<User | null>(null);

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