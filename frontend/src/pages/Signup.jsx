import React, { useState } from 'react'
import axios from 'axios';
import { URL } from '../../rootUrl';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../redux/constants/user';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import ErrAlert from '../../components/ErrAlert';


const Signup = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [ err,setErr ] = useState([]);
    const { loading,error } = useSelector(state=>state.userData);
    const HandleSignup = () => {
            dispatch({ type: USER.SIGNUP_REQUEST });
            axios.post(URL + '/signup', {
                email: email
            }).then(res => {
                console.log(res);
                let data = JSON.parse(res.data.data);
                console.log(data)
                const user = {
                    id:data.userId,
                    email:data.email
                };
                dispatch({ type: USER.SIGNUP_SUCCESS,payload:user });
                navigate('/getotp');
            }).catch(err=>{
                console.log(err.response.data.error);
                dispatch({ type: USER.SIGNUP_FAILED,error:err });
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
            <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email Id..." />
            <button onClick={HandleSignup}>Sign up</button>
        </label>
        </div>
        </div>
    )
}

export default Signup
