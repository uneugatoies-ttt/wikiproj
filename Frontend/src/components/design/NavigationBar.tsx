import { Button } from '@mui/material';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { signout } from '../services/ApiService';

export default function NavigationBar() {
    const [loggedIn, setLoggedIn] = React.useState((
            localStorage.getItem('ACCESS_TOKEN') && 
            localStorage.getItem('USERNAME')
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
                backgroundColor: '#3E32C7',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                
            }}    
        >
            <Toolbar
                style={{
                    
                    minWidth: '300px',
                    maxWidth: '1500px',
                }}  
            >
                <Grid 
                    justifyContent="space-between"
                    container
  
                >
                    <Grid item>
                        <Typography variant="h6">WP</Typography>
                    </Grid>

                    <Grid item>
                        <div>

                        </div>
                    </Grid>

                    <Grid item>
                        <Button 
                            color="inherit" 
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