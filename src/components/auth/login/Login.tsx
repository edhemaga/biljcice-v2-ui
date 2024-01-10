import { FC, useRef, useState } from "react";
import Form from "../../../shared/components/Form/Form";

import { IFormConfig } from "../../../shared/components/Form/IForm";

import { AxiosError } from "axios";
import axiosInstance from "../../../shared/traffic/axios";

import { TRefreshFunction } from "../../../shared/models/TRefreshFunction";

import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ILoginData } from "./interface/ILoginData";

const Login: FC = () => {
  const form = useRef<TRefreshFunction>(null);
  let navigate = useNavigate();

  const config: IFormConfig<ILoginData> = {
    title: "Login",
    state: {
      email: "",
      password: "",
    },
    fields: [
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
        id: "submit",
        type: "Button",
        placeholder: "Login",
        spacing: 10,
        fullWidth: true,
      },
    ],
  };

  const passData = async (data: ILoginData): Promise<void> => {
    try {
      const response = await axiosInstance.post("/user/login", data);
      const token = response.data.token;
      if (token) localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        form.current?.refresh();
      }
    }
  };

  return (
    <div style={{ margin: 'auto' }}>
      <Form ref={form} config={config} passData={passData}></Form>
    </div>
  );
};

export default Login;
