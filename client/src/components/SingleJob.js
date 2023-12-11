import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessIcon from '@mui/icons-material/Business';
import Loader from './Loader';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const SingleJob = () => {
    const id = localStorage.getItem('userId')
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const handleApply = async () => {
        try {
            if (!isLoggedIn) {
                navigate('/auth')
            }
            const config = {
                headers: {
                    'Authorization': userId
                }
            }
            const { data } = await axios.post(`https://job-portal-uqhl.onrender.com/api/job/apply/${job._id}`, {}, config)
            if (data?.success) {
                toast.success('Successfully Applied to Job')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchJobDetails = async () => {
        try {
            const { data } = await axios.get(`https://job-portal-uqhl.onrender.com/api/job/get-job/${jobId}`);
            if (data?.success) {
                setJob(data?.job);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchJobDetails();
    }, [jobId]);

    if (!job) {
        return <Loader />
    }

    return (
        <>
            <Box fullWidth sx={{ background: 'linear-gradient(to right, #8e2de2, #4a00e0)', boxShadow: '10px 20px 10px #ccc', color: 'white', textAlign: 'center', padding: '10px 20px' }}>
                <Typography variant='h4' sx={{ margin: '2px' }}>{<WorkIcon />} {job.position}</Typography>
                <Typography variant='h5' sx={{ margin: '2px' }}>{<BusinessIcon />} @{job.company}</Typography>
                <Typography variant='h6'>{<LocationOnIcon />}{job.location}</Typography>
                <Button variant='contained'  onClick={handleApply} sx={{ margin: '1', padding: '10px 20px', backgroundImage: 'radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)', color: 'white' }} endIcon={<WorkIcon />}>Apply Now</Button>
            </Box>
            <Box sx={{ justifyContent: 'center', alignItems: 'center', marginTop: '20px', padding: '20px 40px' }}>
                <Button LinkComponent={Link} startIcon={<ArrowBackIcon />} to='/all-jobs' sx={{ background: 'linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)', color: 'white' }}>View All Jobs</Button>
                <Typography variant='h6' sx={{ color: '#4834D4' }}>Company URL</Typography>
                <a href={job.url}>{job.url}</a>
                <Typography variant='h6' sx={{ color: '#4834D4' }}>Job Type</Typography>
                <Typography>{job.type}</Typography>
                <Typography variant='h6' sx={{ color: '#4834D4' }}>Job Pay</Typography>
                <Typography>{job.pay}</Typography>
                <Typography variant='h6' sx={{ color: '#4834D4' }}>Roles and Responsibilties</Typography>
                <Typography>{job.description}</Typography>
                {/* Display other job details here */}
                {<Toaster position="top-right" reverseOrder={false} />}
            </Box>
        </>
    );
};

export default SingleJob;
