import {
  actions,
  PostType,
  profileReducer,
  ProfileType,
} from "./profile-reducer";

type startStateType = {
  posts: Array<PostType>;
  profile: ProfileType | null;
  status: string;
  newPostText: string;
};

let startState: startStateType;

beforeEach(() => {
  startState = {
    posts: [
      { id: "1", message: "Hi, how are you?", likesCount: 12 },
      { id: "2", message: "It's my first post", likesCount: 11 },
      { id: "3", message: "Blala", likesCount: 11 },
      { id: "4", message: "Dada", likesCount: 15 },
    ],
    profile: null,
    status: "",
    newPostText: "",
  };
});

test("new post should be added with new length of array", () => {
  let action = actions.addPostAC("it-kamasutra win");

  const endState = profileReducer(startState, action);

  expect(endState.posts.length).toBe(5);
  expect(endState.posts[4].message).toBe("it-kamasutra win");
});

test("new status should be added", () => {
  const endState = profileReducer(
    startState,
    actions.setStatus("it-kamasutra the best own")
  );

  expect(endState.status).toBe("it-kamasutra the best own");
});

test("after deleting length of messages should be decrement", () => {
  const endState = profileReducer(startState, actions.deleteMessage("1"));

  expect(endState.posts.length).toBe(3);
});

test("status profile should be changed", () => {
  const endState = profileReducer(startState, actions.setStatus("Tesla 1000$"));

  expect(endState.status).toBe("Tesla 1000$");
});
