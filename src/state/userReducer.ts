import { User } from '../types'
interface LoginAction {
    type: 'Login'
    payload: User
}
interface LogoutAction {
    type: 'Logout'
}
type Action = LoginAction | LogoutAction

interface State {
    user: User | undefined
}
const userReducer = (state:State = {user: undefined}, action: Action): State => {
    switch (action.type) {
      case 'Login':
        return { user: action.payload}
      case 'Logout':
        return { user: undefined}
      default:
        return state
    }
}
export default userReducer


/*ACTION CREATORS */
export const loginUserAction = (user: User): Action => {
    return {
        type: 'Login',
        payload: user
    }
}

export const logoutUserAction = () : Action => {
    return {
        type: 'Logout'
    }
}

