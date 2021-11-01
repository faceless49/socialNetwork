import {
  addPostAC,
  PostType,
  profileReducer,
  ProfileType,
} from "./profile-reducer";
import { v1 } from "uuid";

type startStateType = {
  posts: Array<PostType>;
  profile: ProfileType | null;
  status: string;
};

let startState: startStateType;

beforeEach(() => {
  startState = {
    posts: [
      { id: v1(), message: "Hi, how are you?", likesCount: 12 },
      { id: v1(), message: "It's my first post", likesCount: 11 },
      { id: v1(), message: "Blala", likesCount: 11 },
      { id: v1(), message: "Dada", likesCount: 15 },
    ],
    profile: null as ProfileType | null,
    status: "",
  };
});

test("new post should be added", () => {
  let action = addPostAC("it-kamasutra win");

  const endState = profileReducer(startState, action);

  expect(endState.posts.length).toBe(5);
  expect(endState.posts[4].message).toBe("it-kamasutra win");
});
