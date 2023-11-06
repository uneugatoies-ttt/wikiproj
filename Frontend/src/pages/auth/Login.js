import React from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { signin, socialLogin } from '../../services/ApiService';

/*  TODO
    -> 

*/

function Login() {
    const [formData, setFormData] = React.useState({ username: '', password: '' });

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        signin({ username: formData.username, password: formData.password })
            .then((res) => {
                if (res === 'user not found') {
                    console.log('user not found');
                } else {
                    if (res.token && res.username) {
                        localStorage.setItem("ACCESS_TOKEN", res.token);
                        localStorage.setItem("USERNAME", res.username);
                        window.location.href = '/';
                    }
                }
            });
    }

    const handleSocialLogin = (provider) => {
        socialLogin(provider);
    }

    /*
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");
        const password = data.get("password");

        signin({ username: username, password: password });
    }

    const handleSocialLogin = (provider, event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");
        socialLogin(provider, username);
    }
    */

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                </Grid>
            </Grid>

            <form noValidate onSubmit={handleSubmit}>
                {" "}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="userid"
                            id="username"
                            name="username"
                            autoComplete="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            onClick={() => handleSocialLogin("github")}
                            fullWidth
                            variant="contained"
                            style={{backgroundColor: '#000'}}
                        >
                            Login with GitHub
                        </Button>
                    </Grid>
                    <Grid item>
                        <Link to="/signup" variant="body2">
                            Have no account? Sign up in here.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );

}

export default Login;