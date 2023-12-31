import React from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { signin, socialLogin } from '../../components/services/ApiService';

function Login() {
    const [formData, setFormData] = React.useState({ username: '', password: '' });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signin({ username: formData.username, password: formData.password });
    }

    const handleSocialLogin = (provider: string) => {
        socialLogin(provider);
    }
    
    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <form noValidate onSubmit={handleSubmit}>
                {" "}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                    </Grid>
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
                        <Link to="/signup">
                            Have no account? Sign up in here.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );

}

export default Login;