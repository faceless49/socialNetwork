import { Field, Form, Formik } from "formik";
import React from "react";
import { FilterType } from "../../redux/users-reducer";

const usersSearchValidate = (values: any) => {
  const errors = {};
  return errors;
};

type UserSearchFormPropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FormType = {
  term: string;
  friend: "true" | "false" | "null";
};

export const UsersSearchForm: React.FC<UserSearchFormPropsType> = React.memo(
  (props) => {
    const submit = (
      values: FormType,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
      const filter: FilterType = {
        term: values.term,
        friend:
          values.friend === "null"
            ? null
            : values.friend === "true"
            ? true
            : false,
      };
      props.onFilterChanged(filter);
      setSubmitting(false);
    };

    return (
      <div>
        <Formik
          initialValues={{ term: "", friend: "null" }}
          validate={usersSearchValidate}
          onSubmit={submit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="term" />
              <Field name="friend" as="select">
                <option value="null">All</option>
                <option value="true">Only followed</option>
                <option value="false">Only unfollowed</option>
              </Field>

              <button type="submit" disabled={isSubmitting}>
                Find
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
);
