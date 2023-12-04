import '../../App.css';
import React, { useEffect, useState } from 'react';
import { List, Typography, Button, Container, Box, Grid } from '@mui/material';
import NavigationBar from '../../components/design/NavigationBar';
import Footer from '../../components/design/Footer';

export default function Main() {
  /*
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  let loadingPage = <h1> ...Now Loading... </h1>;
  let content = loadingPage;
    
  if (!loading) {
    content = loadDone;
  }

  const loadDone = (
    <div>
      <Container maxWidth="md">
        <Typography>
          <List>
            {items.map((item, index) => (
              <div key={index}>
                {item}
              </div>
            ))}
          </List>
        </Typography>
        <Button onClick={() => window.location.href="/create-draft"}>
          Create a New Wiki
        </Button>
      </Container>
    </div>
  );*/

  const content = (
    <Container>

      <Grid 
        container
        justifyContent="center"
        alignItems="center"
        style={{
          marginTop: '80px',
        }}
      >
        <Typography 
          fontSize={40}
          style={{
            maxWidth: '600px',
          }}
        >
          "Create your own wiki about the world you've been dreaming of."
        </Typography>
      </Grid>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          marginTop: '50px',
        }}
      >
        <Button
          style={{
            backgroundColor: "#F7FAFF",
            width: '300px',
            height: '50px',
          }}
          onClick={() => {
            window.location.href = '/wikidraft'
          }}
        >
          Start a New Wiki
        </Button>
      </Grid>
    </Container>
  )

  return (
    <div>
      <NavigationBar/>
        {content}
      <Box mt={5}>
          <Footer />
      </Box>
    </div>
  )
}