import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls/FormsControls";
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

const LoginForm = (props: any) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          type="text"
          placeholder="Email"
          name="email"
          component={Input}
          validate={[required, minLength4]}
        />
      </div>{" "}
      <div>
        <Field
          type="password"
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
      {props.error && <div className={styles.formSummaryError}>Error</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "login", // a unique name for this form
})(LoginForm);

export default connect(mapStateToProps, { login })(Login);
