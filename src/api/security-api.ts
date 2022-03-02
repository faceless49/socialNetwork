import { instance } from "./api";
import { ResponseType } from "./auth-api";

export type CaptchaResponseDataType = {
  url: string;
};

export const securityAPI = {
  getCaptcha() {
    return instance
      .get<ResponseType<CaptchaResponseDataType>>("/security/get-captcha-url")
      .then((res) => res.data);
  },
};
