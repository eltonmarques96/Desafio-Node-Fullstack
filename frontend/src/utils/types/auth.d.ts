export type TUser = {
    id: string;
    email: string;
    username: string;
};

export type TRegister = {
    email: string;
    username: string;
    password: string;
};

export type AuthUser = {
    token: string;
    user: TUser;
};

export type TLogin = {
    email: string;
    password: string;
};

export type AuthResponse = {
    message: string;
    data?: AuthUser;
    success?: boolean;
};
