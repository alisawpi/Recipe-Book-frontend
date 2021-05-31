import { Message } from '../types'

interface CreateAction {
    type: 'CreateMessage',
    payload: Message
}
interface RemoveAction {
    type: 'RemoveMessage'
}
type Action = CreateAction | RemoveAction

interface State {
    message: Message | undefined
}
const messageReducer = (state: State = { message: undefined }, action: Action): State => {
    switch (action.type) {
        case 'CreateMessage':
            return { message: action.payload }
        case 'RemoveMessage':
            return { message: undefined }
        default:
            return state
    }
}
export default messageReducer

/*ACTION CREATORS */
export const createMessageAction = (message: Message): Action => {
    return {
        type: 'CreateMessage',
        payload: message
    }
}

export const removeMessageAction = (): Action => {
    return {
        type: 'RemoveMessage'
    }
}

