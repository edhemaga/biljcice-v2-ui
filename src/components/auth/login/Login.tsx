import { FC, useRef } from "react";
import Form from "../../../shared/components/Form/Form";

//Interfaces and models
import { IFormConfig } from "../../../shared/components/Form/IForm";
import { ILoginData } from "./interface/ILoginData";
import { IUser } from "../../../shared/models/User/IUser";
import { TRefreshFunction } from "../../../shared/models/TRefreshFunction";

//Network
import { AxiosError } from "axios";
import axiosInstance from "../../../shared/traffic/axios";

//Hooks and redux
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set } from "../../../redux/user/userSlice";

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

      if (!token) throw new Error("Token not found!");

      localStorage.setItem("token", token);

      const userData: Partial<IUser> = {
        name: response.data?.name,
        surname: response.data?.surname,
        email: response.data?.email,
        phone: response.data?.phone,
        country: response.data?.country,
      };

      dispatch(set(userData as IUser));

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
