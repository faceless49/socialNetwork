import { Field, reduxForm } from "redux-form";

export const Login = (props: any) => {
  const onSubmit = (formData: any) => {
    console.log(formData);
  };
  return (
    <div>
      <h1>LOGIN</h1>;
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};
const LoginForm = (props: any) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          type="text"
          placeholder="Login"
          name="login"
          component={"input"}
        />
      </div>{" "}
      <div>
        <Field
          type="text"
          placeholder="Password"
          name="password"
          component={"input"}
        />
      </div>{" "}
      <div>
        <Field type="checkbox" component={"input"} name={"rememberMe"} />{" "}
        remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "login", // a unique name for this form
})(LoginForm);
