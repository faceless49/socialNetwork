import { Redirect } from "react-router-dom";
import React, { ComponentType } from "react";
import { AppStateType } from "../redux/redux-store";
import { connect } from "react-redux";

type MapStatePropsType = {
  isAuth: boolean;
};

let mapStateToPropsForRedirect = (state: AppStateType) =>
  ({
    isAuth: state.auth.isAuth,
  } as MapStatePropsType);

export const withAuthRedirect = function <T>(Component: ComponentType<T>) {
  const RedirectComponent: React.FC<MapStatePropsType> = (props) => {
    let { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to={"/login"} />;
    return <Component {...(restProps as T)} />;
  };

  let ConnectedAuthRedirectComponent = connect<
    MapStatePropsType,
    {},
    T,
    AppStateType
  >(mapStateToPropsForRedirect)(RedirectComponent);
  return ConnectedAuthRedirectComponent;
};
