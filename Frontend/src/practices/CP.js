import React, { useState } from 'react';
import { 
    AppBar,
    Grid,
    Container,
    Button,
} from '@mui/material';
import { call, signout } from '../services/ApiService';

const AddWiki = (props) => {
    const [item, setItem] = useState({})
}

function CP() {
    const [state, setState] = useState("Initial Value");
    const [text, setText] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setState(text);
    }



    let navigationBar = (
        <AppBar position="static">

        </AppBar>
    )


    return (
        <div>
            <Container>
                <form onSubmit={handleSubmit}>
                    <Grid>
                        <h1>{state}</h1>
                    </Grid>
                    <Grid>
                        <input
                            type="text"
                            id="tempText"
                            onChange={(e) => setText(e.target.value)}
                        />
                        <br/>
                        <Button type="submit" fullWidth color="primary">
                            change the current state
                        </Button>
                    </Grid>
                </form>
            </Container>
        </div>
    );
}

export default CP;















/*
import React, { useState, useEffect } from 'react';



function doStep1(init, callback) {
    const result = init + 1;
    callback(result);
}
function doStep2(init, callback) {
    const result = init + 2;
    callback(result);
}
function doStep3(init, callback) {
    const result = init + 3;
    callback(result);
}

function doOperation() {
    doStep1(0, (result1) => {
        doStep2(result1, (result2) => {
            doStep3(result2, (result3) => {
                console.log(`result: ${result3}`);
            });
        });
    });
}

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const randomNumber = Math.random();
        if (randomNumber < 0.5) {
            resolve(randomNumber);
        } else {
            reject('Operation failed');
        }
    }, 1000);
});

myPromise
    .then((result) => {
        console.log('Promise resolved with result: ', result);
    })
    .catch((error) => {
        console.error('Promise rejected with error: ', error);
    });
function CP() {
    return (
        <>
        </>
    );
}

export default CP;
*/















/*
function fetchData(url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response wasn\'t ok');
            }
            return response.json();
        })
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

function CP() {
    const [content, setContent] = useState('');
    const apiUrl = 'https://www.google.com';

    useEffect(() => {
        fetchData(apiUrl, (error, data) => {
            if (error) {
                console.error('Error: ', error);
            } else {
                setContent(data);
            }
        });
    }, []);

    return (
        <div>
            <h1>Google Homepage</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}


*/







/*


function CP() {
    const [content, setContent] = useState('');

    useEffect(() => {
        const fet = async () => {
            try {
                const response = await fetch('https//www.google.com');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.text();
                setContent(data);
            } catch (error) {
                console.error('Error: ', error);
            }
        };

        fet();
    }, []);

    return (
        <div>
            <h1>Google Homepage</h1>
        </div>
    );
}

export default CP;*/


