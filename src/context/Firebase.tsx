import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
    apiKey: import.meta.env.API_KEY,
    authDomain: "book-store-6ef01.firebaseapp.com",
    projectId: "book-store-6ef01",
    storageBucket: "book-store-6ef01.firebasestorage.app",
    messagingSenderId: import.meta.env.SENDER_ID,
    appId: import.meta.env.APP_ID
};

const FirebaseContext = createContext<any>(null);

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (!context) throw new Error("useFirebase must be used within a FirebaseProvider");
    return context;
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

interface FirebaseProviderProps {
    children: any;
}

const provider = new GoogleAuthProvider();

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (u: any) => {
            if (u) {
                setUser(u);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe(); 
    }, []);
    const isLogined = user ? true : false
    const signupUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    };
    const loginUser = (email: string, password: string) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password)
    }
    const signInWithGoogle = () => {
        return signInWithPopup(firebaseAuth, provider);
    };
    return (
        <FirebaseContext.Provider value={{ signupUser, loginUser, signInWithGoogle, isLogined }}>
            {children}
        </FirebaseContext.Provider>
    );
};