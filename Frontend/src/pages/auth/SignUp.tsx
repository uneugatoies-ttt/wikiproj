import React, { FormEvent } from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import { signup, UserDTO } from '../../services/ApiService';
import { Link } from 'react-router-dom';

function SignUp() {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const username = data.get("username")?.toString();
        const password = data.get("password")?.toString();
        const email = data.get("email")?.toString();
        if (username && password && email) {
            signup({ username: username, password: password, email: email });
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            Create an Account
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            variant="outlined"
                            required
                            fullWidth
                            name="username"
                            id="username"
                            label="UID"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            id="password"
                            label="PASSWORD"
                            type="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="email"
                            id="email"
                            label="EMAIL"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Create Accout
                        </Button>
                    </Grid>
                    <Grid item>
                        <Link to="/login">
                            Already have an account? Log in.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default SignUp;