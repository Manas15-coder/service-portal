import React from 'react'
import '../App.css'
import { Card, CardContent, Typography, Button, Grid, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import SearchIcon from '@mui/icons-material/Search';
import Loader from './Loader';


const Alljob = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedPay, setSelectedPay] = useState('all');
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [filters, setFilters] = useState(false)

    const navigate = useNavigate();

    const sendRequest = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/job/all-job');
            if (data?.success) {
                setJobs(data?.jobs);
                setFilteredJobs(data?.jobs);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        sendRequest();
    }, []);

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        const filteredJobs = jobs.filter(job =>
            job.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredJobs(filteredJobs);
    };

    const handleFilterChange = (filterName, filterValue) => {
        if (filterValue === 'all') {
            setFilteredJobs(jobs);
        } else {
            const filteredJobs = jobs.filter(job =>
                job[filterName] === filterValue
            );
            setFilteredJobs(filteredJobs);
        }
    };


    if (filteredJobs.length === 0) {
        return (<div style={{marginTop:'20%',textAlign:'center',background:''}}>
             <h2>No Organization Found...</h2>
             <img src='data:image/png;base64,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'/>
        </div>)
    }

    const showFilters = () => {
        setFilters(true)
    }
    if (!jobs) {
        <Box sx={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center', marginTop: '10%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h4'>No Jobs Found .....</Typography>
            <img src="https://qjobsindia.com/assets/img/no-jobs-found.png" />
        </Box>
    }

    return (
        <>
        <div className='service-banner'>
            <h2 className='display-2'>View All Organizations</h2>
            <div className='search'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            Search a Service
                            <input
                                placeholder="Search Organization or Service"

                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}

                            />

                        </div>
                        <div className='col-md-6'>
                            Advanced Search
                            {(<>
                                <FormControl sx={{ marginBottom: '20px', minWidth: 150, justifyContent: 'center', textAlign: 'center' }}>
                                    <Select
                                        value={selectedCategory}
                                        onChange={(e) => handleFilterChange('category', e.target.value)}
                                    >
                                        <MenuItem value="all">Category</MenuItem>
                                        <MenuItem value="education">Education & Learning</MenuItem>
                                        <MenuItem value="health">Health & Wellness</MenuItem>
                                        <MenuItem value="electricity">Electricity</MenuItem>
                                        <MenuItem value="money">Money</MenuItem>
                                        <MenuItem value="job">Jobs</MenuItem>
                                        <MenuItem value="other">Others</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ marginBottom: '20px', minWidth: 150 }}>
                                    <Select
                                        value={selectedType}
                                        onChange={(e) => handleFilterChange('type', e.target.value)}
                                    >
                                        <MenuItem value="all">Company Type</MenuItem>
                                        <MenuItem value="government">Government</MenuItem>
                                        <MenuItem value="private">Private</MenuItem>
                                        <MenuItem value="hybrid">Hybrid</MenuItem>
                                    </Select>
                                </FormControl>
                            </>)}

                        </div>
                    </div>
                </div>
            </div>
         
        </div>
            <Typography variant='h4' sx={{ textAlign: 'center', color: '#00589f', fontWeight: 'bold' }}>View All Organizations</Typography>
            
            <Grid container sx={{ justifyContent: 'center', padding: '10px 5px' }}>

                {filteredJobs.map((job) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ padding: '0 20px' }}>
                        <Card sx={{ margin: '5px', padding: '10px', fontWeight: 'bold', borderRadius: '15px', width: '100%', maxWidth: '100%' }} elevation={12}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                                    {job.position}
                                </Typography>
                                <Typography variant='h6' >{job.company}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Location: {job.location}
                                </Typography>
                                <Typography variant="body2" color="textPrimary">
                                    Type: {job.type}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Category: {job.category}
                                </Typography>
                                <Button sx={{ backgroundImage: 'linear-gradient(144deg,#00589f, #5B42F3 50%,#00DDEB);', color: 'white' }} LinkComponent={Link} to={`/job/get-job/${job._id}`} endIcon={<ArrowForwardIcon />}>
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

            </Grid>
        </>
    )
}

export default Alljob
