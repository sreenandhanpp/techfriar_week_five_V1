import React, { useState } from 'react'
import {getItem} from '../../localStorage/getItem'
import axios from 'axios';
import { URL } from '../../rootUrl';
import { USER } from '../redux/constants/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ErrAlert from '../../components/ErrAlert';

const VerifyPhone = () => {
  const [digitOne ,setDigitOne] = useState('');
  const [digitTwo ,setDigitTwo] = useState('');
  const [digitThree ,setDigitThree] = useState('');
  const [digitFour,setDigitFour] = useState('');
  const [msg,setMsg] = useState();
  const [err,setErr] = useState('');
  const [errors,setErrors] = useState([]);
  const dispatch = useDispatch();
  const user = getItem('user');
  const navigate = useNavigate('/');
  
  const HandleVerify = (e) => {
    e.preventDefault();
    dispatch({ type: USER.VERIFY_OTP_REQUEST });
    axios.post(URL+'/verify-otp',{
      id:user.id,
      otp:digitOne+digitTwo+digitThree+digitFour
    }).then(res=>{
      console.log(res)
      dispatch({ type: USER.VERIFY_OTP_SUCCESS,payload:res.data.message});
      setMsg(res.data.message);
      navigate('/home');
    }).catch(err=>{
      console.log(err.response.data.error);
      dispatch({ type: USER.VERIFY_OTP_FAILED,error:err.response.data.message });
      setErrors(err.response.data.error );
    });
  }
  const HandleResend = (e) => {
    e.preventDefault(e);
    dispatch({ type: USER.RESEND_OTP_REQUEST });
    axios.post(URL+'/resendPhoneOtp',{
      id:user.id,
      phone:user.phone
    }).then(res=>{
      console.log(res)
      dispatch({ type: USER.RESEND_OTP_SUCCESS,payload:res.data.message});
      setMsg(res.data.message);
    }).catch(err=>{
      console.log(err)
      dispatch({ type: USER.RESEND_OTP_FAILED,error:err.message });
      setErr(err.response.data.message );
    });
  }
  return (
    <div>
      <form className="otp-Form">
        <span className="mainHeading">Enter OTP</span>
      {
       msg?
       <p className="otpSubheading">{ msg }</p> : 
       err?
       <p className="otpSubheading1">{ err }</p> :
        errors.length > 0?
       <ErrAlert errors={errors} /> :
       <p className="otpSubheading">We have sent a verification code to your phone number</p>
       }
        <div className="inputContainer">
          <input onChange={e=> setDigitOne(e.target.value)} required="required" maxLength="1" type="text" className="otp-input" id="otp-input1" />
          <input onChange={e=> setDigitTwo(e.target.value)} required="required" maxLength="1" type="text" className="otp-input" id="otp-input2" />
          <input onChange={e=> setDigitThree(e.target.value)} required="required" maxLength="1" type="text" className="otp-input" id="otp-input3" />
          <input onChange={e=> setDigitFour(e.target.value)} required="required" maxLength="1" type="text" className="otp-input" id="otp-input4" />
        </div>
        <button className="verifyButton" type="submit" onClick={(e)=>HandleVerify(e)}>Verify</button>
        {/* <button className="exitBtn">×</button> */}
        <p className="resendNote">Didn't receive the code? <button className="resendBtn" onClick={(e)=>HandleResend(e)}>Resend Code</button></p>
      </form>
    </div>
  )
}

export default VerifyPhone
