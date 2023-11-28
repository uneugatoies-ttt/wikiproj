import { Button } from '@mui/material';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { signout } from '../services/ApiService';

export default function NavigationBar() {
    const [loggedIn, setLoggedIn] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.getItem('ACCESS_TOKEN') && localStorage.getItem('USERNAME')) {
            setLoggedIn(true);
        }
    }, [loggedIn]);

    const login = () => {
        window.location.href = '/login';
    }

    const logout = () => {
        signout();
        setLoggedIn(false);
    }

    return (
        <AppBar position="static">
            <Toolbar>
            <Grid justifyContent="space-between" container>
                <Grid item>
                <Typography variant="h6">Wikiproj</Typography>
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