import React from "react";
import Profile from "./Profile";
import {
  getStatus,
  getUserProfile,
  ProfileType,
  savePhoto,
  saveProfile,
  updateStatus,
} from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

type MapPropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchToProps = {
  getUserProfile: (userID: number) => void;
  getStatus: (userID: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

type PathParamsType = {
  userID: string;
};

type PropsType = MapPropsType &
  MapDispatchToProps &
  RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userID: number | null = +this.props.match.params.userID;
    if (!userID) {
      userID = this.props.authorizedUserId;
      if (!userID) {
        this.props.history.push("/login");
      }
    }
    if (!userID) {
      console.error(
        "ID should exists in URI params or in state ('authorizedUserId')"
      );
    } else {
      this.props.getUserProfile(userID);
      this.props.getStatus(userID);
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
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
let mapStateToProps = (state: AppStateType) => ({
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
