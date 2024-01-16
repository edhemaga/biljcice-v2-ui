import { ChangeEvent } from "react";
import { jwtDecode } from "jwt-decode";
import { IJwtClaims } from "../models/Base/IJwtClaims";
import axiosInstance from "../traffic/axios";
import { IUser } from "../models/User/IUser";

export const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<any>>
) => {
    setter(event.currentTarget.value);
};

export const formatDate = (date: Date): string => {
    return (
        [
            date.getDay(),
            date.getMonth() + 1,
            date.getFullYear(),
        ].join('/') +
        ' ' +
        [
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        ].join(':')
    );
}

export const hasAuthData = (): boolean => {
    return localStorage.getItem("token") ? true : false;
}

export const getUserData = async (token: string): Promise<Partial<IUser>> => {

    const claims: IJwtClaims = jwtDecode(token);
    if (!claims.id) return {};
    const response = await axiosInstance.get(`/user/${claims.id}`);
    let userData: Partial<IUser> = {
        id: claims.id,
        name: response.data?.name,
        surname: response.data?.surname,
        email: response.data?.email,
        phone: response.data?.phone,
        country: response.data?.country,
        devices: response.data?.devices
    };
    return userData;
}