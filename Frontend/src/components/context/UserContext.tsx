import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Define the shape of your user context
interface UserContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

interface UserProviderProps {
    children: ReactNode;
}

// Create the context with an initial state
const UserContext = createContext<UserContextType | undefined>(undefined);

const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

// Create the UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        console.log('isLoggedIn in UserContext\'s UserProvider is: ', isLoggedIn);
    }, [isLoggedIn]);

    const login = () => {
        console.log("logging in");
        setLoggedIn(true);
    }
    const logout = () => {
        console.log("logging out");
        setLoggedIn(false);
    };

    const contextValue: UserContextType = {
        isLoggedIn,
        login,
        logout,
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default useUser;
