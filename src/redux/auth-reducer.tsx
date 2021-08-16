import {ActionsTypes} from './redux-store';

const SET_USER_DATA = 'SET_USER_DATA'


export type DataPropsType = {
  userID: string | null,
  email: string | null,
  login: string | null,
}

export type AuthPropsType = {
  data: Array<DataPropsType>
}
// export type AuthPropsType = {
//   messages: Array<string>
//   data: Array<DataPropsType>
// }

let authInitialState = {
  userID: null,
  email: null,
  login: null,
}

const authReducer = (state: DataPropsType = authInitialState, action: ActionsTypes): DataPropsType => {
  switch (action.type) {
    case SET_USER_DATA:
   return {
     ...state,
     ...action.data
   }
    default:
      return state
  }
}

export const setUserData = (userID: string, email: string, login: string) => ({type: SET_USER_DATA, data: {userID, email, login}} as const)

export default authReducer