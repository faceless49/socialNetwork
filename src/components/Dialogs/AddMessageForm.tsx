import { Field, reduxForm } from "redux-form";
import {
  createField,
  Input,
  Textarea,
} from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import React from "react";
import { NewMessageFormType } from "./Dialogs";

const maxLength50 = maxLengthCreator(50);

type MessageFormValuesTypeKeys = Extract<keyof NewMessageFormType, string>;

const AddMessageForm = (props: any) => {
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

export const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(
  AddMessageForm
);
