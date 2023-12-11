import React, { useEffect, useState } from 'react'
import { AppBar, Button, Grid, Toolbar, Typography, Box, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';


const BottomNavbar = () => {

    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const dispatch = useDispatch();
    console.log('state', isLoggedIn)
    const [value, setValue] = useState();
    const userId = localStorage.getItem('userId')

    return (
        <div>
            {isLoggedIn && (
                <AppBar sx={{ background: "transparent", color: '#00589f', position: 'fixed', top: 'auto', bottom: '0', height: '60px' }}>
                    <Toolbar>
                        <Box display="flex" margin='auto' justifyContent={'center'} sx={{ fontSize: '5px' }}>
                            <Grid container>

                                <Grid item>
                                    <Tabs indicatorColor='secondary' value={value} onChange={(e, val) => setValue(val)}>
                                        <Tab LinkComponent={Link} to='/' icon={<HomeIcon fontSize='16px' />} iconPosition='top' label='Home' sx={{ color: '#00589f', fontWeight: 'bold' }}></Tab>
                                        <Tab LinkComponent={Link} to='all-jobs' icon={<SearchIcon fontSize='16px' />} iconPosition='top' label='View Services' sx={{ color: '#00589f', fontWeight: 'bold' }}></Tab>
                                        <Tab LinkComponent={Link} to='/create-jobs' icon={<CreateIcon fontSize='16px' />} iconPosition='top' label='Post Review' sx={{ color: '#00589f', fontWeight: 'bold' }}></Tab>
                                        <Tab LinkComponent={Link} to='/job/applied-jobs/:${userId}' icon={<PersonIcon fontSize='16px' />} iconPosition='top' label='Your Reviews' sx={{ color: '#00589f', fontWeight: 'bold' }}></Tab>
                                    </Tabs>
                                </Grid>
                            </Grid>

                        </Box>
                    </Toolbar>
                </AppBar>


            )}
        </div>
    )
}

export default BottomNavbar
