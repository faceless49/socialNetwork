import React from 'react';
import Header from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAuthUserData} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';


type MapStateToProps = {
  isAuth: boolean
  login: string | null
}

type MapDispatchToProps = {
  setAuthUserData:(id: string, email: string, login: string) => void
}


type HeaderPropsType = MapStateToProps & MapDispatchToProps

class HeaderContainer extends React.Component<HeaderPropsType> {

  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/auth/me`, {
          withCredentials: true
        })
      .then((response) => {
        if (response.data.resultCode === 0) {
          let {id, email, login} = response.data.data
          this.props.setAuthUserData(id, email, login)
        }
      });
  }

  render() {
    return <Header {...this.props}/>
    // this.props - прокидываем все пропсы в header
  }

}


let mapStateToProps = (state: AppStateType): MapStateToProps => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);
