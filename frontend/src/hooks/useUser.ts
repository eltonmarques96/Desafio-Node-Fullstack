// /hooks/useUser.ts

import { useContext } from 'react';
import useCookie from './useCookie';
import { AuthContext } from '@/context/AuthContext';
import { AuthUser } from '@/utils/types/auth';

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setCookie, removeCookie } = useCookie();

    const addUser = (user: AuthUser) => {
        setUser(user);
        setCookie('user', JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        removeCookie('user');
    };

    return { user, addUser, removeUser };
};
