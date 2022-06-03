export interface LoginParams {
    username: string;
    password: string;
}

export interface RegisterParams {
    username: string;
    email: string;
    password: string;
}

export interface User {
    username: string;
    email: string;
    avatar: string;
    role: string;
    accessToken: string;
}
