import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../shared/models/User/IUser";

const initialState: IUser = {
    id: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    country: "",
    devices: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<IUser>) => {
            //Obavezno na ovaj način i u buduće raspaktivati objekat
            //state = action.payload ili state = {...action.payload} jednostavno ne pokreće provjeru stanja
            //Pogledaj ovdje ako se ne sjetiš zašto https://youtu.be/5yEG6GhoJBs?si=DDXd_gEAhADv0wgY&t=929
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.country = action.payload.country;
            state.devices = action.payload.devices;
        },
        reset: (state) => {
            state.id = initialState.id;
            state.name = initialState.name;
            state.surname = initialState.surname;
            state.email = initialState.email;
            state.phone = initialState.phone;
            state.country = initialState.country;
            state.devices = initialState.devices;
        },
        get: (state) => { }
    }
});

export const { set, reset } = userSlice.actions;

export default userSlice.reducer;