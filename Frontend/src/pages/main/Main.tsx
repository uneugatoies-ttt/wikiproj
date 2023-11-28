import '../../App.css';
import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { List, Typography } from '@mui/material';
import { Button } from '@mui/base';
import NavigationBar from '../../components/design/NavigationBar';

export default function Main() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
  );

  let loadingPage = <h1> ...Now Loading... </h1>;
  let content = loadingPage;
    
  if (!loading) {
    content = loadDone;
  }

  return (
    <div>
      <NavigationBar/>
      sdfsdfsdf
    </div>
  )

}