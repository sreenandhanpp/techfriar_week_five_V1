import React, { useState } from 'react'
import axios from 'axios';
import { URL } from '../../rootUrl';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../redux/constants/user';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import ErrAlert from '../../components/ErrAlert';


const Phone = () => {
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const [ err,setErr ] = useState([]);
    const { loading,error } = useSelector(state=>state.phoneUserData);
    const HandleSignup = () => {
            dispatch({ type: USER.PHONE_USER_REQUEST });
            axios.post(URL + '/getOptphone', {
                phone: phone
            }).then(res => {
                console.log(res);
                let data = JSON.parse(res.data.data);
                console.log(data)
                const user = {
                    id:data.userId,
                    phone:data.phone
                };
                dispatch({ type: USER.PHONE_USER_SUCCESS,payload:user });
                navigate('/verify-phone');
            }).catch(err=>{
                console.log(err.response.data.error);
                dispatch({ type: USER.PHONE_USER_FAILED,error:err });
                if(err){
                    setErr(err.response.data.error);
                }
            })
    }
    return (
       
        loading?  <Loader /> :
        <div>
            <ErrAlert errors={err} />    
        <div className='signup-form'>
            {error? <p>{error}</p> : null}
        <label>
            <input type="text" onChange={(e) => setPhone(e.target.value)} placeholder="Enter Your Phone Number..." />
            <button onClick={HandleSignup}>Sign up</button>
        </label>
        </div>
        </div>
    )
}

export default Phone
