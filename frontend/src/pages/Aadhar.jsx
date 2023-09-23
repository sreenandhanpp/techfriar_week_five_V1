import React, { useState } from 'react'
import axios from 'axios';
import { URL } from '../../rootUrl';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../redux/constants/user';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import ErrAlert from '../../components/ErrAlert';


const Aadhar = () => {
    const dispatch = useDispatch();
    const [aadhar, setAadhar] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const [err, setErr] = useState([]);
    const { loading, error } = useSelector(state => state.aadharData);
    const HandleSignup = () => {
        dispatch({ type: USER.AADHAR_VERIFY_REQUEST });
        axios.post(URL + '/aadhar', {
            aadhar: aadhar
        }).then(res => {
            console.log(res);
            setErr('');
            dispatch({ type: USER.AADHAR_VERIFY_SUCCESS, payload: res.data.message });
            setMsg(res.data.message);
        }).catch(err => {
            // console.log(err);
            setMsg('')
            // console.log(err.response.data.error);
            dispatch({ type: USER.AADHAR_VERIFY_FAILED, error: err });
            if (err) {
                setErr(err.response.data.error);
            }
        })
    }
    return (
        loading ? <Loader /> :
            <div>
                <ErrAlert errors={err} />
                <div className='signup-form'>
                    {
                        msg &&
                        <p className="otpSubheading">{msg}</p>
                    }
                    <label>
                        <input type="text" onChange={(e) => setAadhar(e.target.value)} placeholder="Enter Your Aadhar Number..." />
                        <button onClick={HandleSignup}>Verify</button>
                    </label>
                </div>
            </div>
    )
}

export default Aadhar
