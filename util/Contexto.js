import React, {createContext, useState, useEffect} from 'react';
import auth from '../backend/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const usuario = onAuthStateChanged(auth, user => {
            if (user){
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });
        return () => usuario();
    }, []);

    return (
        <AuthContext.Provider value={{ userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

