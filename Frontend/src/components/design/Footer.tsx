import React from 'react';
import { Typography, Container, Box, } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function Copyright() {
    return (
        <Typography variant="body2" color="#3F4245">
            {'NOT Copyrighted © '}
                Uneugatoies, {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function Footer() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    backgroundColor: '#EEF1F5',
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1" color="#3F4245">
                        FOOTER
                    </Typography>
                </Container>
                <Copyright />
            </Box>
        </ThemeProvider>
    )
}

/*
export default function Footer() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <CssBaseline />
                <Box
                    component="footer"
                    sx={{
                        py: 3,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: '#EEF1F5',
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography variant="body1" color="#3F4245">
                            FOOTER
                        </Typography>
                    </Container>
                    <Copyright />
                </Box>
            </Box>
        </ThemeProvider>
    )
}*/