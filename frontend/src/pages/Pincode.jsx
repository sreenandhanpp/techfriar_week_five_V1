import React, { useState } from 'react'
import axios from 'axios';
import { URL } from '../../rootUrl';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../redux/constants/user';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import ErrAlert from '../../components/ErrAlert';


const Pincode = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pincode, setPincode] = useState('');
    const [err, setErr] = useState('');
    const [city, setCity] = useState('');
    const [dist, setDist] = useState('');
    const [state, setState] = useState('');
    const [region, setRegion] = useState('');

    const { loading, error, data } = useSelector(state => state.pincodeData);

    const HandleFetch = (e) => {
        // e.preventDefault()
        dispatch({ type: USER.FETCH_PIN_DETAILS_REQUEST });
        axios.get(`https://api.postalpincode.in/pincode/${pincode}`).then(res => {
            if (res.data[0].PostOffice) {
                console.log(res);
                console.log(res.data[0].PostOffice[0]);
                let data = res.data[0].PostOffice[0];
                setDist(data.District);
                setState(data.State);
                setCity(data.Block);
                setRegion(data.Region);
                dispatch({ type: USER.FETCH_PIN_DETAILS_SUCCESS, payload: data });
            } else {
                throw "No Records Found";
            }
        }).catch(err => {
            console.log(err)
            setErr(err);
            dispatch({ type: USER.FETCH_PIN_DETAILS_FAILED, error: err });
        })
    }
    return (

        loading ? <Loader /> :
            <div>

                {/* <ErrAlert errors={err} /> */}


                <div className='signup-form'>
                    {error ? <p>{error}</p> : null}
                    <label>
                        <input type="text" onChange={(e) => setPincode(e.target.value)} placeholder="Enter Pincode..." />
                        <button onClick={(e) => HandleFetch(e)}>GET</button>
                    </label>
                </div>
                {
                    err ?
                        <div className='pincode-wrapper'>
                            <div className="card">
                                <p className="card-title"> </p>
                                <p className="card-des2">
                                    {err}
                                </p>
                            </div>
                        </div>
                        : data ?
                            <div className='pincode-wrapper'>
                                <div className="card">
                                    <p className="card-title">Pincode Detals</p>
                                    <p className="card-des">
                                        {city},{dist},{region},{state}
                                    </p>
                                </div>
                            </div>
                            : null
                }
            </div>
    )
}

export default Pincode
