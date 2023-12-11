import { Box, TextField, Typography, Button, Grid } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import '../App.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../store'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isSignUp, setIsSignUp] = useState(true)

    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    })
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const sendRequest = async (type = "login") => {
        try {
            const { data } = await axios.post(`http://localhost:8000/api/user/${type}`, {
                username: inputs.name,
                email: inputs.email,
                phone: inputs.phone,
                password: inputs.password,
            })
            if (data.success) {
                localStorage.setItem("userId", data?.user._id);
                toast.success('Successfully Logged In')
            }
            return data;
        } catch (error) {
            console.log(error);
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignUp) {
            // Handle user registration
            sendRequest("register")
                .then((data) => {
                    if (data.success) {
                        // Registration was successful, proceed with login
                        return sendRequest();
                    } else {
                        // Handle registration failure (e.g., duplicate email)
                        console.error("Registration failed:", data.message);
                        toast.error(data.message)
                        throw new Error(data.message);
                    }
                })
                .then(() => {
                    // Log in the user and navigate to the blogs page
                    dispatch(authActions.login());
                    navigate("/all-jobs");
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error("Error:", error);
                });
        } else {
            // Handle user login
            sendRequest()
                .then((data) => {
                    if (data.success) {
                        // Login was successful, navigate to the blogs page
                        dispatch(authActions.login());
                        navigate("/all-jobs");
                        toast.success(data.message)
                    } else {
                        // Handle login failure (e.g., incorrect credentials)
                        console.error("Login failed:", data.message);
                        toast.error(data.message)
                    }
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error("Error:", error);
                });
        }
    };


    return (
        <>
            <Grid container marginTop={10} justifyContent={'center'}>
                <Grid item>
                    <img src='https://e-sevavivad.cbic.gov.in/ServiceMatterPortal/resources/images/login.png' className='img-fluid' alt='login-img' />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection={'column'} alignItems='center' justifyContent={"center"} boxShadow="10px 10px 20px #ccc" backgroundColor="#fff" padding={3} margin='auto' borderRadius={5} width={'100%'} height={'100%'}>
                            <Typography variant='h5' fontWeight={"bold"} padding={3} textAlign={'center'} sx={{ color: '#00589f;', fontWeight: 'bold' }}>{isSignUp ? "Sign Up to Avail Services" : "Login to Apply to Avail Services"}</Typography>
                            <Typography variant='h5' fontWeight={"bold"} padding={3} textAlign={'center'} sx={{ color: '##00589f;' }}>{<LockOpenIcon />}</Typography>
                            {isSignUp && <TextField variant='standard' name="name" onChange={handleChange} value={inputs.name} type='text' placeholder='Name' margin='normal' sx={{ width: '250px' }} required />} {" "}
                            <TextField variant='standard' name="email" onChange={handleChange} value={inputs.email} type='email' placeholder='Email' margin='normal' sx={{ width: '250px' }} required />
                            {isSignUp && <TextField variant='standard' name="phone" onChange={handleChange} value={inputs.phone} type='number' placeholder='Phone Number' margin='normal' sx={{ width: '250px' }} required />}
                            <TextField variant='standard' name="password" onChange={handleChange} value={inputs.password} type='password' placeholder='Password' margin='normal' sx={{ width: '250px' }} required />
                            <Button type='submit' variant='contained' sx={{ borderRadius: 3, marginTop: 3, backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)', width: '250px', fontWeight: 'bold' }} >{isSignUp ? "Sign Up " : "Sign In"}</Button>
                            <Button onClick={() => setIsSignUp(!isSignUp)} sx={{ borderRadius: 3, color: 'black' }}>{isSignUp ? "Already Registerd ? Login" : "New User ? Register"}</Button>
                        </Box>
                    </form>
                    {<Toaster position="top-right" reverseOrder={false} />}

                </Grid>

            </Grid>


        </>

    )
}
export default Auth
