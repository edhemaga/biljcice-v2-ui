import { FC, useRef } from "react";
import Form from "../../../shared/components/Form/Form";

//Interfaces and models
import { IFormConfig } from "../../../shared/components/Form/IForm";
import { IUser } from "../../../shared/models/User/IUser";
import { TRefreshFunction } from "../../../shared/models/TRefreshFunction";
import { ILoginData } from "./interface/ILoginData";

//Network
import { AxiosError } from "axios";
import axiosInstance from "../../../shared/traffic/axios";

//Hooks and redux
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set } from "../../../redux/user/userSlice";

import { getUserData } from "../../../shared/helpers/helper";

const Login: FC = () => {
  const dispatch = useDispatch();

  const form = useRef<TRefreshFunction>(null);
  const navigate = useNavigate();

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
        touched: false,
      },
      {
        id: "password",
        type: "Password",
        placeholder: "Password",
        required: true,
        spacing: 10,
        fullWidth: true,
        touched: false,
      },
      {
        id: "submit",
        type: "Button",
        placeholder: "Login",
        spacing: 10,
        fullWidth: true,
        touched: false,
      },
    ],
  };

  const passData = async (data: ILoginData): Promise<void> => {
    try {
      const response = await axiosInstance.post("/user/login", data);
      const token = response.data;

      if (!token) throw new Error("Token not found!");

      //Možda prebaciti u helper ili posebnu funkciju
      localStorage.setItem("token", token);

      const user = await getUserData(token);
      dispatch(set(user as IUser));

      navigate("/");
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        form.current?.refresh();
      }
    }
  };

  return (
    <div style={{ margin: "auto" }}>
      <Form ref={form} config={config} passData={passData}></Form>
    </div>
  );
};

export default Login;
