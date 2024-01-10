import { FC, useRef, useState } from "react";

import {
  IRegistrationData,
  IRegistrationDataExpanded,
} from "./interface/IRegistrationData";
import { IFormConfig } from "../../shared/components/Form/IForm";
import { TRefreshFunction } from "../../shared/models/TRefreshFunction";

import Form from "../../shared/components/Form/Form";

import axios, { AxiosError } from "axios";

const Registration: FC = () => {
  const form = useRef<TRefreshFunction>(null);

  const [message, setMessage] = useState("");

  const config: IFormConfig<IRegistrationData> = {
    title: "Registration",
    state: {
      name: "",
      surname: "",
      type: 1,
      email: "",
      password: "",
      phone: "",
      country: "",
    },
    fields: [
      {
        id: "name",
        type: "Text",
        placeholder: "Firstname",
        required: true,
        spacing: 10,
        fullWidth: true,
      },
      {
        id: "surname",
        type: "Text",
        placeholder: "Lastname",
        required: true,
        spacing: 10,
        fullWidth: true,
      },
      {
        id: "email",
        type: "Text",
        placeholder: "Email address",
        required: true,
        spacing: 10,
        fullWidth: true,
      },
      {
        id: "password",
        type: "Password",
        placeholder: "Password",
        required: true,
        spacing: 10,
        fullWidth: true,
      },
      {
        id: "confirmPassword",
        type: "Password",
        placeholder: "Confirm password",
        required: true,
        spacing: 10,
        fullWidth: true,
      },
      {
        id: "phone",
        type: "Text",
        placeholder: "Phone number",
        required: true,
        spacing: 10,
        fullWidth: true,
      },
      {
        id: "country",
        type: "Text",
        placeholder: "Country",
        required: true,
        spacing: 10,
        fullWidth: true,
      },
      {
        id: "submit",
        type: "Button",
        placeholder: "Register",
        spacing: 10,
        fullWidth: true,
      },
    ],
  };

  const passData = async (data: IRegistrationDataExpanded): Promise<void> => {
    try {
      if (data.password !== data.confirmPassword)
        throw new Error("Password does not match!");

      //Write automapper function
      const responseData: IRegistrationData = {
        name: data.name,
        surname: data.surname,
        type: data.type,
        email: data.email,
        password: data.password,
        phone: data.phone,
        country: data.country,
      };
      const response = await axios.post(
        "http://localhost:3001/user",
        responseData
      );
      const token = response.data.token;
      if (token) localStorage.setItem("token", token);
      setMessage("");
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        form.current?.refresh();
        setMessage("Wrong credentials!");
      }
    }
  };

  return <Form ref={form} config={config} passData={passData}></Form>;
};

export default Registration;
