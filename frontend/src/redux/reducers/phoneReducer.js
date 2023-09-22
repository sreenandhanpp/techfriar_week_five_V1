import { USER } from "../constants/user"
import {setItem} from "../../../localStorage/setItem"

let initialState = {
    loading:false,
    error:"",
    data:{}
}

export const phoneReducer = (state = initialState,action) => {
    switch(action.type){
        case USER.PHONE_USER_REQUEST:
            return { ...state, loading:true}
        case USER.PHONE_USER_SUCCESS:
            setItem('user',action.payload)
            return { ...state,loading: false,data: action.payload }
        case USER.PHONE_USER_FAILED:
            return { ...state,loading: false,error: action.payload }
        default:
            return state
    }
}

