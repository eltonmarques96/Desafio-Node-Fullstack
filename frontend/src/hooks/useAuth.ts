import { useUser } from './useUser';
import { AuthResponse, TLogin } from '@/utils/types/auth';
import useCookie from './useCookie';
import api from '@/services/httpRequest';

export const useAuth = () => {
    const { user, addUser, removeUser } = useUser();

    const { getCookie } = useCookie();

    const refresh = () => {
        let existingUser = null;
        const getFromCookie = async () => (existingUser = getCookie('user'));
        getFromCookie();

        if (existingUser) {
            try {
                addUser(JSON.parse(existingUser));
            } catch (e) {
                console.log(e);
            }
        }
    };

    const loginAPICall = async (creds: TLogin) => {
        return await api
            .post('/users/login', creds)
            .then((res) => {
                if (res.data?.data && res.data.data?.token)
                    addUser(res.data.data);
                return res.data as AuthResponse;
            })
            .catch((err) => {
                if (err && err?.response && err.response?.data)
                    return {
                        ...err.response.data,
                        success: false,
                    } as AuthResponse;
                else return err as AuthResponse;
            });
    };

    const logout = () => {
        removeUser();
    };

    return { user, loginAPICall, logout, refresh };
};
