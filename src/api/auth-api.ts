import { instance, ResultCodesEnum } from "./api";
import { CaptchaResponseDataType } from "./security-api";

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};

type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

type LoginResponseDataType = {
  userId: number;
};

export const authApi = {
  me() {
    return instance
      .get<ResponseType<MeResponseDataType>>(`auth/me`)
      .then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: string | null = null
  ) {
    return instance
      .post<
        ResponseType<
          LoginResponseDataType,
          ResultCodesEnum & CaptchaResponseDataType
        >
      >(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};
