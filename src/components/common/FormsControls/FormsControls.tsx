import styles from "./FormsControls.module.scss";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../../utils/validators/validators";
import React, { FC } from "react";

type FormControlType = {
  meta: WrappedFieldMetaProps;
};

export const FormControl: React.FC<FormControlType> = ({
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error;

  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea: FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...props} {...restProps} />
    </FormControl>
  );
};

export const Input: FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...props} {...restProps} />
    </FormControl>
  );
};

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: FC<WrappedFieldProps>,
  props = {},
  text: string
) {
  return (
    <div>
      <Field
        type="text"
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
        text={""}
      />{" "}
      {text}
    </div>
  );
}
