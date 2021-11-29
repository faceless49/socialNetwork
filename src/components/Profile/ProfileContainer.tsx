import React from "react";
import Profile from "./Profile";
import {
  getStatus,
  getUserProfile,
  savePhoto,
  saveProfile,
  updateStatus,
} from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

type MapStatePropsType = {
  profile: any;
  status: string;
  authorizedUserId: any;
  isAuth: boolean;
};

type MapDispatchToProps = {
  getUserProfile: (userID: number) => void;
  getStatus: (userID: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: any) => void;
  saveProfile: () => void;
};

type PathParamsType = {
  userID: any;
};

type OwnPropsType = MapStatePropsType & MapDispatchToProps;
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType;

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userID = this.props.match.params.userID;
    if (!userID) {
      userID = this.props.authorizedUserId;
      if (!userID) {
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userID);
    this.props.getStatus(userID);
  }

  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(
    prevProps: Readonly<PropsType>,
    prevState: Readonly<{}>,
    snapshot?: any
  ) {
    if (this.props.match.params.userID !== prevProps.match.params.userID) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <div>
        <Profile
          {...this.props}
          isOwner={!this.props.match.params.userID}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          savePhoto={this.props.savePhoto}
        />
      </div>
    );
  }
}
let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});
export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
