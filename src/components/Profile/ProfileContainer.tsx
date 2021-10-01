import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import {getUserProfile, setUserProfile} from '../../redux/profile-reducer';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {usersAPI} from '../../api/api';


class ProfileContainer extends React.Component<any> {

  componentDidMount() {
    let userID = this.props.match.params.userID
    if (!userID) {
      userID = 2
    }
    //* THUNK HOMEWORK
    // axios
    //   .get(
    //     `https://social-network.samuraijs.com/api/1.0/profile/` + userID)
    //   .then((response) => { // fixme when we get Promise will be using ItemsResponseType
    //     this.props.setUserProfile(response.data);
    //   });
    this.props.getUserProfile(userID)
  }

  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile}/>
        {/*  ... Все пропсы прокидываем*/}
      </div>
    )
  }
}

let mapStateToProps = (state: any) => ({profile: state.profilePage.profile})

let WithUrlDataContainerComponent = withRouter(ProfileContainer) // Для прокидывания данных из URL

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)