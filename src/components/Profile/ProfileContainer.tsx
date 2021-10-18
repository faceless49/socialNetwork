import React from "react";
import Profile from "./Profile";
import { getUserProfile } from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

type MapStatePropsType = {
  profile: any;
};
type MapDispatchToProps = {
  getUserProfile: (userID: string) => void;
};

type PathParamsType = {
  userID: string;
};

type OwnPropsType = MapStatePropsType & MapDispatchToProps;
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType;

class ProfileContainer extends React.Component<PropsType> {
  componentDidMount() {
    let userID = this.props.match.params.userID;
    if (!userID) {
      userID = "2";
    }
    this.props.getUserProfile(userID);
  }

  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}
let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
});
export default compose<React.ComponentType>(
  connect(mapStateToProps, { getUserProfile }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
