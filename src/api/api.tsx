import axios from "axios";
import { UserType } from "../types/types";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "db8d2f12-200b-4467-ba1f-cd791df3f39c",
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}
