import { combineReducers } from 'redux'
import { userReducer } from './reducers/signupReducer'
import { verifyReducer } from './reducers/verifyOtp'
import { resendOtp } from './reducers/resendOtp'
import { pincodeReducer } from './reducers/pincodeReducer'




export const rootReducers = combineReducers({
    userData: userReducer,
    verify: verifyReducer,
    resendOtp:resendOtp,
    pincodeData: pincodeReducer,
})

