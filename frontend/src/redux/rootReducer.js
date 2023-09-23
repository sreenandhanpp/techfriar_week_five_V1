import { combineReducers } from 'redux'
import { userReducer } from './reducers/signupReducer'
import { verifyReducer } from './reducers/verifyOtp'
import { resendOtp } from './reducers/resendOtp'
import { pincodeReducer } from './reducers/pincodeReducer'
import { phoneReducer } from './reducers/phoneReducer'
import { aadharReducer } from './reducers/aadharReducer'




export const rootReducers = combineReducers({
    userData: userReducer,
    verify: verifyReducer,
    resendOtp:resendOtp,
    pincodeData: pincodeReducer,
    phoneUserData: phoneReducer,
    aadharData: aadharReducer
})

