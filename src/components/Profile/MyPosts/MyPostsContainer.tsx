import { actions, PostType } from "../../../redux/profile-reducer";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { Dispatch } from "redux";
import { MyPosts } from "./MyPosts";

type MapStatePropsType = {
  posts: Array<PostType>;
};

type MapDispatchToPropsType = {
  addPost: (newPostText: string) => void;
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    posts: state.profilePage.posts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    addPost: (newPostText) => {
      dispatch(actions.addPostAC(newPostText));
    },
  };
};

const MyPostsContainer = connect<
  MapStatePropsType,
  MapDispatchToPropsType,
  {},
  AppStateType
>(
  mapStateToProps,
  mapDispatchToProps
)(MyPosts);
export default MyPostsContainer;
