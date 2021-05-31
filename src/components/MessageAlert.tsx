import React from 'react'
import { useDispatch } from 'react-redux'
import { removeMessageAction } from '../state/messageReducer'
import { Message } from '../types'

const MessageAlert = (props: Message): JSX.Element | null => {
    const dispatch = useDispatch()
    if (props.error === undefined || props.text === undefined) {
        return null
    }
    if (props.error) {
        return (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
               {props.text}
               <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        )
    }
    return (
        <div className="alert alert-primary alert-dismissible fade show" role="alert">
           {props.text}
           <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => dispatch(removeMessageAction())}></button>
        </div>
    )
}

export default MessageAlert