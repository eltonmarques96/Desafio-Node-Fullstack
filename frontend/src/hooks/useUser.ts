// /hooks/useUser.ts

import { useContext } from 'react';
import useCookie from './useCookie';
import { AuthContext } from '@/context/AuthContext';
import { AuthUser } from '@/utils/types/auth';

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setCookie, removeCookie } = useCookie();

    const addUser = (newUser: AuthUser) => {
        setUser(newUser);
        setCookie('desafio-elton-token', JSON.stringify(newUser));
    };

    const removeUser = () => {
        setUser(null);
        removeCookie('desafio-elton-token');
    };

    return { user, addUser, removeUser };
};
