import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import UserModel from "../data/models/userModel";

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState<UserModel>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                });
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = async () => {
        setUser(null);
        await signOut(auth);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}