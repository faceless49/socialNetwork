import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Textarea } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import React from "react";
import { NewMessageFormValuesType } from "./Dialogs";

const maxLength50 = maxLengthCreator(50);

type MessageFormValuesTypeKeys = Extract<
  keyof NewMessageFormValuesType,
  string
>;

const AddMessageForm: React.FC<
  InjectedFormProps<NewMessageFormValuesType, {}> & {}
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {createField<MessageFormValuesTypeKeys>(
        "Enter your message",
        "newMessageBody",
        [required, maxLength50],
        Textarea,
        {},
        ""
      )}
      <button>Send message</button>
    </form>
  );
};

export const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, {}>({
  form: "dialogAddMessageForm",
})(AddMessageForm);
