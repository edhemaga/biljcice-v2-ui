import { IDevice } from "../../components/Device/IDevice";

export interface IUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    country: string;
    devices?: IDevice[];
}