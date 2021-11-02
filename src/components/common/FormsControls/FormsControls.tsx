import styles from "./FormsControls.module.scss";
import { Field } from "redux-form";
import { required } from "../../../utils/validators/validators";

export const FormControl = ({
  input,
  meta: { touched, error },
  children,
  ...props
}: any) => {
  const hasError = touched && error;

  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea = (props: any) => {
  const { input, meta, children, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...props} {...restProps} />
    </FormControl>
  );
};

export const Input = (props: any) => {
  const { input, meta, children, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...props} {...restProps} />
    </FormControl>
  );
};

export const CreateField = (
  placeholder?: string | null,
  name?: string,
  validators?: any | null,
  component?: any | null,
  props: any = {},
  text?: string | null
) => {
  return (
    <div>
      <Field
        type="text"
        placeholder={placeholder}
        name={name}
        component={component}
        validate={validators}
        {...props}
        text={""}
      />{" "}
      {text}
    </div>
  );
};
//* TODO: Type validators component
