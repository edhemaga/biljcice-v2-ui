import { ChangeEvent } from "react";
import { jwtDecode } from "jwt-decode";
import { IJwtClaims } from "../models/Base/IJwtClaims";
import axiosInstance from "../traffic/axios";
import { IUser } from "../models/User/IUser";
import { ILineGraphItem, IReadingByMonth } from "../models/Graph/ILineGraph";

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
    let userData: Partial<IUser> =
    {
        id: claims.id,
        name: response.data?.name,
        surname: response.data?.surname,
        email: response.data?.email,
        phone: response.data?.phone,
        country: response.data?.country,
        devices: response.data?.devices
    };
    // let userData: Partial<IUser> =
    // {
    //     id: claims.id,
    //     name: "Edim",
    //     surname: "Hadzic",
    //     email: "edimhadzic98@gmail.com",
    //     phone: "387603148500",
    //     country: "Bosnia and Herzegovina",
    //     devices: [{
    //         id: "425ab0eb-d694-4f79-9e4f-990aa588442b",
    //         status: 1,
    //         createdOn: new Date(),
    //         geoLocation: 'Sarajevo'
    //     }]
    // };
    return userData;
}

export const generateLineGraphForReadings = (data: IReadingByMonth[]) => {
    const labels = data.map((reading: IReadingByMonth) => {
        const uniqueLabels: string[] = [];
        if (!uniqueLabels.find((arg) => arg === reading.time))
            uniqueLabels.push(reading.time);
        return uniqueLabels;
    });

    let items: ILineGraphItem[] = [];
    data.forEach((line: IReadingByMonth) => {
        const itemIndex = items.findIndex((arg) => arg.label === line.sensor);
        if (itemIndex < 0) {
            items = [...items, { label: line.sensor, data: [] }];
            if (items.length !== 0)
                items[items.length - 1].data = [
                    ...items[items.length - 1].data,
                    line.value,
                ];
        } else {
            items[itemIndex].data = [...items[itemIndex].data, line.value];
        }
    });

    return { labels, items }
}