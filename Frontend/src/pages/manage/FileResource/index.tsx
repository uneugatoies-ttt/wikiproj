import React from 'react';

import { Container, Grid, Button } from '@mui/material';

import ChooseFile from './FileInput';


/* NOTE/TODO
    -> refer: https://amnesia.fandom.com/wiki/Special:NewFiles
    So this page will be used for managing every type of file.
*/

function FileResource() {
    const [openChooseFile, setOpenChooseFile] = React.useState(false);

    const uploadButtonClick = () => {
        setOpenChooseFile(true);
    }

    return (
        <Container>
            {/* top menu; the searching/filtering menu should be added. */}
            <Grid>
                <Button>SEARCH AND FILTER</Button>
                <Button onClick={uploadButtonClick}>UPLOAD A NEW IMAGE</Button>
            </Grid>

            <ChooseFile
                open={openChooseFile}
                handleClose={() => setOpenChooseFile(false)}
            />

            <Grid>
                {/* Every file that was uploaded from this wiki should be fetched and displayed. */}
            </Grid>
        </Container>
    );
}

export default FileResource;