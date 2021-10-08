import React from 'react';
import Profile from './Profile';
import {getUserProfile} from '../../redux/profile-reducer';
import {connect} from 'react-redux';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';

type MapStatePropsType = {
  profile: null
  isAuth: boolean
};
type MapDispatchToProps = {
  getUserProfile: (userID: string) => void
}

type PathParamsType = {
  userID: string
}

type OwnPropsType = MapStatePropsType & MapDispatchToProps
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType




class ProfileContainer extends React.Component<PropsType> {

  componentDidMount() {
    let userID = this.props.match.params.userID
    // if (!userID) {
    //   userID = 2
    // }
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

    if (!this.props.isAuth) return <Redirect to={'/login'}/>

    return (
      <div>
        <Profile {...this.props} profile={this.props.profile}/>
        {/*  ... Все пропсы прокидываем*/}
      </div>
    )
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer) // Для прокидывания данных из URL

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)