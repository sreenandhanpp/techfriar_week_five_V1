import React, { useState } from 'react'
import axios from 'axios';
import { URL } from '../../rootUrl';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../redux/constants/user';
import Loader from '../../components/Loader';
import ErrAlert from '../../components/ErrAlert';


const Aadhar = () => {
    const dispatch = useDispatch();
    const [aadhar, setAadhar] = useState('');
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState([]);
    const { loading, error } = useSelector(state => state.aadharData);
    const HandleSignup = () => {
        dispatch({ type: USER.AADHAR_VERIFY_REQUEST });
        axios.post(URL + '/aadhar', {
            aadhar: aadhar
        }).then(res => {
            setErr('');
            dispatch({ type: USER.AADHAR_VERIFY_SUCCESS, payload: res.data.message });
            setMsg(res.data.message);
        }).catch(err => {
            setMsg('')
            console.log(err.response);
            dispatch({ type: USER.AADHAR_VERIFY_FAILED, error: err });
            if (err.response.status === 400) {
                // console.log(err.response.status)
                setErr(err.response.data.error);
            }
        })
    }
    return (
        loading ? <Loader /> :
            <div>
                <ErrAlert errors={err} />
                    {
                        msg &&
                        <p className="otpSubheading">{msg}</p>
                    }
                <div className='signup-form'>
                    <label>
                        <input type="text" onChange={(e) => setAadhar(e.target.value)} placeholder="Enter Your Aadhar Number..." />
                        <button onClick={HandleSignup}>Verify</button>
                    </label>
                </div>
            </div>
    )
}

export default Aadhar
