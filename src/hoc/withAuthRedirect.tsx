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

export function withAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapStatePropsType & {}> = (props) => {
    let { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to={"/login"} />;

    return <WrappedComponent {...(restProps as WCP)} />;
  };

  let ConnectedAuthRedirectComponent = connect<
    MapStatePropsType,
    {},
    WCP,
    AppStateType
  >(mapStateToPropsForRedirect)(RedirectComponent);
  return ConnectedAuthRedirectComponent;
}
