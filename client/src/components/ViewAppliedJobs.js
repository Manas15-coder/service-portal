import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { Card, CardContent, Typography, Button, Grid, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ViewAppliedJobs() {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const id = localStorage.getItem("userId")
    useEffect(() => {
        fetchAppliedJobs();
    }, []);

    const fetchAppliedJobs = async () => {
        try {
            const response = await axios.get(`https://job-portal-uqhl.onrender.com/api/job/applied-jobs/${id}`);
            if (response.data.success) {
                setAppliedJobs(response.data.appliedJobs);
                console.log(appliedJobs)
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching applied jobs:', error);
        }
    };
    if (appliedJobs.length === 0) {
        return <Loader />
    }

    return (
        <div>
            <Typography variant='h4' sx={{ textAlign: 'center', color: '#4834D4', fontWeight: 'bold' }}>Applied Jobs</Typography>
            <Grid container spacing={2}>
                {appliedJobs.map((job) => (
                    <Grid key={job._id} item xs={12} sm={6} md={4}>
                        <Card sx={{ margin: '20px', padding: '10px', fontWeight: 'bold' }} elevation={12}>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontFamily: 'Arial, sans-serif' }} gutterBottom>
                                    {job.position}
                                </Typography>
                                <Typography variant='h6'>{job.company}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Location: {job.location}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Type: {job.type}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Category: {job.category}
                                </Typography>
                                <Button sx={{ backgroundImage: 'linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);', color: 'white' }} LinkComponent={Link} to={`/job/get-job/${job._id}`} endIcon={<ArrowForwardIcon />}>
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ViewAppliedJobs;
