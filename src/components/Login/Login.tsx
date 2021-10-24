import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls/FormsControls";
import { minLengthCreator, required } from "../../utils/validators/validators";

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

const minLength4 = minLengthCreator(4);

const LoginForm = (props: any) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          type="text"
          placeholder="Login"
          name="login"
          component={Input}
          validate={[required, minLength4]}
        />
      </div>{" "}
      <div>
        <Field
          type="text"
          placeholder="Password"
          name="password"
          component={Input}
          validate={[required, minLength4]}
        />
      </div>{" "}
      <div>
        <Field type="checkbox" component={"input"} name={"rememberMe"} />
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
