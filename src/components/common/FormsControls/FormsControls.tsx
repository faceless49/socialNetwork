import styles from "./FormsControls.module.scss";
import { Field } from "redux-form";
import { required } from "../../../utils/validators/validators";

export const FormControl = ({ input, meta, ...props }: any) => {
  const hasError = meta.touched && meta.error;

  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{props.children}</div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Textarea = (props: any) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...props} {...restProps} />
    </FormControl>
  );
};

export const Input = (props: any) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...props} {...restProps} />
    </FormControl>
  );
};

export const CreateField = (
  placeholder: string,
  name: string,
  validators: any,
  component: any,
  props: any
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
      />
    </div>
  );
};
//* TODO: Type validators component
