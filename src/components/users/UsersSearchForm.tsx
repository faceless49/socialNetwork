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

export const UsersSearchForm: React.FC<UserSearchFormPropsType> = (props) => {
  const submit = (
    values: FilterType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    props.onFilterChanged(values);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{ term: "" }}
        validate={usersSearchValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
