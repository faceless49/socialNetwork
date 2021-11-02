import { Field, reduxForm } from "redux-form";
import { CreateField, Input } from "../common/FormsControls/FormsControls";
import { minLengthCreator, required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import styles from "./../common/FormsControls/FormsControls.module.scss";
const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

const Login = (props: any) => {
  const onSubmit = (formData: any) => {
    console.log(formData);
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const minLength4 = minLengthCreator(4);

const LoginForm = (
  { handleSubmit }: { handleSubmit: () => any },
  error: any
) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {CreateField("Email", "email", [required], Input, null)}
        {CreateField("Password", "password", [required], Input, {
          type: "password",
        })}
        {/*<Field*/}
        {/*  type="text"*/}
        {/*  placeholder="Email"*/}
        {/*  name="email"*/}
        {/*  component={Input}*/}
        {/*  validate={[required, minLength4]}*/}
        {/*/>*/}
      </div>{" "}
      <div>
        {/*<Field*/}
        {/*  type="password"*/}
        {/*  placeholder="Password"*/}
        {/*  name="password"*/}
        {/*  component={Input}*/}
        {/*  validate={[required, minLength4]}*/}
        {/*/>*/}
      </div>{" "}
      <div>
        <Field type="checkbox" component={"input"} name={"rememberMe"} />
        remember me
      </div>
      {error && <div className={styles.formSummaryError}>Error</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "login", // a unique name for this form
  //@ts-ignore
})(LoginForm); // TODO: Typification

export default connect(mapStateToProps, { login })(Login);
