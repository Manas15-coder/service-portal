import { Typography, Box, TextField, Select, MenuItem, Button, InputLabel, Grid } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import SelectInput from '@mui/material/Select/SelectInput';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import AddIcon from '@mui/icons-material/Add';

const CreateJob = () => {
    const id = localStorage.getItem("userId")
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        company: '',
        location: '',
        type: '',
        category: '',
        description: '',
        url: '',
    });

    const handleInputChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:8000/api/job/create-job", {
                company: formData.company,
                location: formData.location,
                type: formData.type,
                category: formData.category,
                description: formData.description,
                url: formData.url,
                user: id,
            })

            toast.success("Blog Created");
            navigate("/all-jobs")

        } catch (error) {
            console.log('Error creating job:', error);
            // Handle error state or display error message
        }
    };


    return (
        <>
            <Typography variant='h4' textAlign='center' sx={{ color: '#00589f', fontWeight: 'bold' }}>
                Fill Up Details of Your Organization
            </Typography>
            <Grid container justifyContent={'center'} spacing={4}>
                <Grid item>
                    <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        justifyContent='center'
                        boxShadow='10px 10px 20px #ccc'
                        backgroundColor='#fff'
                        padding='20px 20px'
                        marginTop={4}
                        borderRadius={5}
                    >
                        <form onSubmit={handleSubmit}>
                            <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 'bold' }}>Organization Details</Typography>
                            <TextField
                                label='Company'
                                name='company'
                                value={formData.company}
                                onChange={handleInputChange}
                                required
                                fullWidth size='small'
                            />
                            
                            <TextField
                                label='Location'
                                name='location'
                                value={formData.location}
                                onChange={handleInputChange}
                                fullWidth
                                size='small'
                            />
                            <InputLabel id='job-type-label'>Company Type</InputLabel>
                            <Select
                                labelId='job-type-label'
                                name='type'
                                value={formData.type}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                size='small'
                            >
                                <MenuItem value='government'>Government</MenuItem>
                                <MenuItem value='private'>Private</MenuItem>
                                <MenuItem value='hybrid'>Hybrid</MenuItem>
                            </Select>
                            <InputLabel id='category-label'>Category</InputLabel>
                            <Select
                                labelId='category-label'
                                name='category'
                                value={formData.category}
                                onChange={handleInputChange}
                                fullWidth
                                size='small'
                            >
                                <MenuItem value='education'>Education</MenuItem>
                                <MenuItem value='health'>Health</MenuItem>
                                <MenuItem value='electricity'>Electricity</MenuItem>
                                <MenuItem value='money'>Money</MenuItem>
                                <MenuItem value='job'>Job</MenuItem>
                                <MenuItem value='other'>Other</MenuItem>
                                
                            </Select>
                            
                            <TextField
                                label='Description'
                                name='description'
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                multiline
                                rows={4}
                                size='small'
                            />
                            <TextField
                                label='URL'
                                name='url'
                                value={formData.url}
                                onChange={handleInputChange}
                                fullWidth
                                size='small'
                            />
                            <Button type='submit' variant='contained' sx={{ marginLeft: '40%', backgroundImage: 'linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);', color: 'white' }} endIcon={<AddIcon />}>
                                Post Details
                            </Button>
                        </form>
                        {<Toaster position="top-right" reverseOrder={false} />}
                    </Box>
                </Grid>

                <Grid item>
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/customer-review-3949823-3277284.png" className='img-fluid' height={'20px'} />
                </Grid>
            </Grid>

        </>
    );
};

export default CreateJob;
