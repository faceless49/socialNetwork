import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "db8d2f12-200b-4467-ba1f-cd791df3f39c",
  },
});

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instance.post(
      // Здесь данные о нашей логинизации передаются 3 объектом, а не 2 как в get request
      `follow/${userId}`
    );
  },
  unfollow(userId: number) {
    // Здесь данные о нашей логинизации передаются 2 объектом
    return instance.delete(`follow/${userId}`);
  },

  getProfile(userId: number) {
    console.warn("Obsolete method. Please use profileAPI object.");
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, { status });
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export enum ResultCodes {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}

type MeResponseType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: ResultCodes;
  messages: Array<string>;
};
type LoginResponseType = {
  data: {
    userId: number;
  };
  resultCode: ResultCodes;
  messages: Array<string>;
};

export const authApi = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then((res) => res.data);
  },
  login(email: string, password: string, rememberMe: boolean = false) {
    return instance
      .post<LoginResponseType>(`auth/login`, { email, password, rememberMe })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};
