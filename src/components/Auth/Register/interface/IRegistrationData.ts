export interface IRegistrationData {
  name: string;
  surname: string;
  type: number;
  email: string;
  password: string;
  phone: string;
  country: string;
}

export interface IRegistrationDataExpanded extends IRegistrationData {
  confirmPassword: string;
}