import { Field, InjectedFormProps, reduxForm } from "redux-form";
import {
  createField,
  GetStringKeys,
  Input,
  Textarea,
} from "../../../common/FormsControls/FormsControls";
import { required } from "../../../../utils/validators/validators";
import React, { FC } from "react";
import { LoginFormValuesType } from "../../../Login/Login";

type PropsType = {};
export type AddPostFormValuesType = {
  newPostText: string;
};

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

const AddNewPostForm: FC<
  InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {createField<AddPostFormValuesTypeKeys>(
        "Post it!",
        "newPostText",
        [required],
        Textarea,
        {},
        ""
      )}
      <button>Add post</button>
    </form>
  );
};

export default reduxForm<AddPostFormValuesType, PropsType>({
  form: "profile-add-post",
})(AddNewPostForm);
