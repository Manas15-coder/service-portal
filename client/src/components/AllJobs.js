import { Card, CardContent, Typography, Button, Grid, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import Loader from './Loader';

const AllJobs = () => {
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
            const { data } = await axios.get('https://job-portal-uqhl.onrender.com/api/job/all-job');
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
            job.position.toLowerCase().includes(searchTerm.toLowerCase())
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
        return <Box sx={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center', marginTop: '10%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h4'>No Jobs Found .....</Typography>
            <Button onClick={() => setFilteredJobs(filteredJobs)} sx={{ backgroundImage: 'linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);', color: 'white', width: '100%', maxWidth: '40%' }}>View Other Jobs</Button>
        </Box>
    }

    const showFilters = () => {
        setFilters(true)
    }

    return (
        <>
            <Typography variant='h4' sx={{ textAlign: 'center', color: '#4834D4', fontWeight: 'bold' }}>All Jobs</Typography>
            <Box sx={{ background: '#fff', borderRadius: '15px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;', marginLeft: 'auto', marginRight: 'auto', padding: '10px 20px', width: '100%', maxWidth: '70%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'sticky' }}>
                <Box display={'inline'}>
                    <Typography variant='h6'>Show Filters</Typography>
                    <Button onClick={() => setFilters(!filters)}>{filters ? (<FilterAltIcon />) : <FilterAltOffIcon />}</Button>
                </Box>

                <TextField
                    label="Search Job by postion"

                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}

                />
                {filters && (<>
                    <FormControl sx={{ marginBottom: '20px', margin: '2px', minWidth: 150, justifyContent: 'center', textAlign: 'center' }}>
                        <Select
                            value={selectedCategory}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                        >
                            <MenuItem value="all">Category</MenuItem>
                            <MenuItem value="programming">Programming</MenuItem>
                            <MenuItem value="graphic-design">Graphic Design</MenuItem>
                            <MenuItem value="software-testing">Software Testing</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ marginBottom: '20px', minWidth: 150 }}>
                        <Select
                            value={selectedType}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                        >
                            <MenuItem value="all">Job Type</MenuItem>
                            <MenuItem value="full-time">Full-time</MenuItem>
                            <MenuItem value="intern">Intern</MenuItem>
                            <MenuItem value="part-time">Part-time</MenuItem>
                            {/* Add other types */}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ marginBottom: '20px', minWidth: 150 }}>
                        <Select
                            value={selectedPay}
                            onChange={(e) => handleFilterChange('pay', e.target.value)}
                        >
                            <MenuItem value="all">Pay</MenuItem>
                            <MenuItem value="inr">INR</MenuItem>
                            <MenuItem value="usd">USD</MenuItem>
                            <MenuItem value="eur">EUR</MenuItem>
                            {/* Add other pay options */}
                        </Select>
                    </FormControl>
                </>)}

            </Box>
            {jobs ? (<Loader />) : (<Grid container spacing={2} marginTop={4}>
                {filteredJobs.map((job) => (
                    <Grid key={job._id} item xs={12} sm={6} md={4}>
                        <Card sx={{ margin: '20px', padding: '10px', fontWeight: 'bold', borderRadius: '15px', zIndex: '1' }} elevation={12}>
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
                                <Button sx={{ backgroundImage: 'linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);', color: 'white' }} LinkComponent={Link} to={`/job/get-job/${job._id}`} endIcon={<ArrowForwardIcon />}>
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>)}

        </>
    );
}

export default AllJobs;
