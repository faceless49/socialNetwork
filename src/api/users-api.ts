import { GetItemsType, instance, ResponseType } from "./api";
import { profileAPI } from "./profile-api";

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instance
      .post<ResponseType>(
        // Здесь данные о нашей логинизации передаются 3 объектом, а не 2 как в get request
        `follow/${userId}`
      )
      .then((res) => res.data);
  },
  unfollow(userId: number) {
    // Здесь данные о нашей логинизации передаются 2 объектом
    return instance
      .delete(`follow/${userId}`)
      .then((res) => res.data) as Promise<ResponseType>;
  },

  getProfile(userId: number) {
    console.warn("Obsolete method. Please use profileAPI object.");
    return profileAPI.getProfile(userId);
  },
};
