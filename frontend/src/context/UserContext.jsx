import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Load user from localStorage and check if token exists
        const storedUserId = localStorage.getItem('userId');
        const storedProfilePic = localStorage.getItem('profilePic');
        const storedEmail = localStorage.getItem('email'); // if needed
        const token = Cookies.get('token');

        if (token && storedUserId) {
            setUser({
                userId: storedUserId,
                profilePic: storedProfilePic,
                email: storedEmail
            });
            setIsLoggedIn(true);
        } else {
            // Clear in case of inconsistency
            Cookies.remove('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('profilePic');
        }
    }, []);

    const loginUser = (userData, token) => {
        // Store in state
        setUser({
            userId: userData._id,
            profilePic: userData.profilePic,
            email: userData.email
        });
        setIsLoggedIn(true);

        // Store token in cookies
        Cookies.set('token', token, { expires: 7 }); // expires in 7 days

        // Store other data in localStorage so it persists across reloads
        localStorage.setItem('userId', userData._id);
        if (userData.profilePic) localStorage.setItem('profilePic', userData.profilePic);
        if (userData.email) localStorage.setItem('email', userData.email);
    };

    const logoutUser = () => {
        setUser(null);
        setIsLoggedIn(false);
        Cookies.remove('token');
        localStorage.clear();
    };

    const value = {
        user,
        isLoggedIn,
        loginUser,
        logoutUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
