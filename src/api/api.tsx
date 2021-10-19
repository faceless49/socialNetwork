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
  follow(userId: string) {
    return instance.post(
      // Здесь данные о нашей логинизации передаются 3 объектом, а не 2 как в get request
      `follow/${userId}`
    );
  },
  unfollow(userId: string) {
    // Здесь данные о нашей логинизации передаются 2 объектом
    return instance.delete(`follow/${userId}`);
  },

  getProfile(userId: string) {
    console.warn("Obsolete method. Please use profileAPI object.");
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId: string) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId: string) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, { status });
  },
};

export const authApi = {
  me() {
    return instance.get(`auth/me`);
  },
};
