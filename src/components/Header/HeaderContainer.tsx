import React from 'react';
import Header from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {getAuthUserData, setAuthUserData} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';
import {authApi} from '../../api/api';


type MapStateToProps = {
  isAuth: boolean
  login: string | null
}

type MapDispatchToProps = {
  getAuthUserData: () => void
}


type HeaderPropsType = MapStateToProps & MapDispatchToProps

class HeaderContainer extends React.Component<HeaderPropsType> {

  componentDidMount() {
    this.props.getAuthUserData()
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

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);
