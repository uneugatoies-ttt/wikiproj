import './App.css';
import React, { useState, useEffect } from 'react';
import {
  Container, List, Paper,
  Grid, Button, AppBar,
  Toolbar, Typography
} from "@mui/material";
import { signout, call } from './services/ApiService';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    call("/unauthorized", "GET", null)
      .then((response) => {
        // this can be done because we defined
        // a field called "data" in the ResponseDTO.java.
        setItems(response.data); 
        setLoading(false);
      })
      .catch((error) =>{
        console.error("ERROR WITH FETCHING DATA:", error);
        //setLoading(false);
      })
  });

  /*
  useEffect(() => {
    call("/temp", "GET", null).then((response) => {
      if (response.data) {
        setItems(response.data);
        setLoading(false);
      } else {
        console.error("Unexpected API response:", response);
        setLoading(false);
      }
    })
    .catch((error) => {
      console.error("Error with fetching data:", error);
      setLoading(false);
    })
  }, []);
  */

  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">Temporary Main - Wiki</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout}>
              Log Out
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

let loadDone = (
  <div>
    {navigationBar}
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
);

let loadingPage = <h1> ...Now Loading... </h1>;
let content = loadingPage;
  
if (!loading) {
  content = loadDone;
}
  


  return (
    <div className="App">{content}</div>
  );
}

export default App;
