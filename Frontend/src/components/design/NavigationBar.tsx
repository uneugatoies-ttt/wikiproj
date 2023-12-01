import { Button } from '@mui/material';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { signout } from '../services/ApiService';

export default function NavigationBar() {
    const [loggedIn, setLoggedIn] = React.useState((
            localStorage.getItem('ACCESS_TOKEN') && localStorage.getItem('USERNAME')
        ) ? true : false);
    
    const login = () => {
        window.location.href = '/login';
    }

    const logout = () => {
        signout();
        setLoggedIn(false);
    }

    return (
        <AppBar 
            position="static"
            style={{
                boxShadow: 'none',
                backgroundColor: '#EEF1F5',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}    
        >
            <Toolbar
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    minWidth: '300px',
                    maxWidth: '1500px',
                    width: '100%',
                }}  
            >
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item minWidth="80px">
                        <Typography variant="h5" color="#3F4245">WP</Typography>
                    </Grid>

                    <Grid item xs={6}></Grid>

                    <Grid 
                        item 
                        style={{
                            minWidth: "130px"
                        }}
                    >
                        <Button
                            style={{
                                backgroundColor: "#7289FF",
                                color: "inherit",
                                fontSize: "13px",
                                
                            }}
                            onClick={loggedIn ? logout : login}
                        >
                            {loggedIn? 'Log out' : 'Log in'}
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}