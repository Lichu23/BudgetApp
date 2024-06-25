import api from "../lib/axios";
import { isAxiosError } from "axios";
import {
  ConfirmToken,
  ForgotPasswordForm,
  NewPasswordForm,
  RequestConfirmationTokenForm,
  User,
  UserLoginForm,
  UserRegistrationForm,
  userScema,
} from "../types";

export async function createAccount(formData: UserRegistrationForm) {
  try {
    const url = "/auth/create-account";
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function confirmAccount(formData: ConfirmToken) {
  try {
    const url = "/auth/confirm-account";
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function requestConfirmationToken(
  formData: RequestConfirmationTokenForm
) {
  try {
    const url = "/auth/request-token";
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function authenticateUser(formData: UserLoginForm) {
  try {
    const url = "/auth/login"
    const { data } = await api.post<string>(url, formData);
    localStorage.setItem("AUTH_TOKEN", data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
  try {
    const url = "/auth/forgot-password";
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function validateToken(formData: ConfirmToken) {
  try {
    const url = "/auth/validate-token";
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

//una mutacion no puedes pasar 2 valores entonces van en un objeto {formdata} y asignarle un type a cada uno
export async function updatePasswordWithToken({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
}) {
  try {
    const url = `/auth/update-password/${token}`;
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

//no pasamos nada por params porq pasamos el token media el interceptor
export async function getUser() {
  try {
    const { data } = await api<User>("/auth/user");
    const response = userScema.safeParse(data)
    if(response.success) {
      return response.data
    }
    return data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
