import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { minLengthCreator, required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import styles from "./../common/FormsControls/FormsControls.module.scss";
import { FC } from "react";

type MapStatePropsType = {
  isAuth: boolean;
  captchaUrl: string | null;
};
type MapDispatchPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => void;
};
type LoginFormOwnPropsType = {
  captchaUrl?: string | null;
};

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    console.log(formData);
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const minLength4 = minLengthCreator(4);

const LoginForm: FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> &
    LoginFormOwnPropsType
> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {createField<LoginFormValuesTypeKeys>(
          "Email",
          "email",
          [required, minLength4],
          Input,
          {},
          ""
        )}
        {createField<LoginFormValuesTypeKeys>(
          "Password",
          "password",
          [required, minLength4],
          Input,
          {
            type: "password",
          },
          ""
        )}
        {createField<LoginFormValuesTypeKeys>(
          undefined,
          "rememberMe",
          [],
          Input,
          { type: "checkbox" },
          "Remember me"
        )}
      </div>
      {captchaUrl && <img src={captchaUrl} />}
      {captchaUrl &&
        createField<LoginFormValuesTypeKeys>(
          "Symbols from image",
          "captcha",
          [required],
          Input,
          {},
          ""
        )}

      {error && <div className={styles.formSummaryError}>Error</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({
  form: "login", // a unique name for this form
})(LoginForm);

export default connect(mapStateToProps, { login })(Login);
