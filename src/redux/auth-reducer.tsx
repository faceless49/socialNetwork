import {ActionsTypes} from './redux-store';

const SET_USER_DATA = 'SET_USER_DATA'


export type DataPropsType = {
  userID: string | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
}

export type AuthPropsType = {
  data: Array<DataPropsType>
  isAuth: boolean
}
// export type AuthPropsType = {
//   messages: Array<string>
//   data: Array<DataPropsType>
// }

let authInitialState = {
  userID: null,
  email: null,
  login: null,
  isAuth: false
}

const authReducer = (state: DataPropsType = authInitialState, action: ActionsTypes): DataPropsType => {
  switch (action.type) {
    case SET_USER_DATA:
   return {
     ...state,
     ...action.data,
     isAuth: true
   }
    default:
      return state
  }
}

export const setAuthUserData = (id: string, email: string, login: string) => ({type: SET_USER_DATA, data: {id, email, login}} as const)

export default authReducer