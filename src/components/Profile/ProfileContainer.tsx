import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import {setUserProfile} from '../../redux/profile-reducer';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';


class ProfileContainer extends React.Component<any> {



  componentDidMount() {
  let userID = this.props.match.params.userID
    if (!userID) {
      userID = 2
    }

    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/` + userID)
      .then((response) => { // fixme when we get Promise will be using ItemsResponseType
        this.props.setUserProfile(response.data);
      });
  }

  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile}/>
      </div>
    )
  }
}

let mapStateToProps = (state: any) => ({profile: state.profilePage.profile})

let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(withUrlDataContainerComponent)