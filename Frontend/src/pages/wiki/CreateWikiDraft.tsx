import React from 'react';
import {
    Container,
    Grid,
    TextField,
    Button,
    RadioGroup,
    Radio,
    FormControlLabel
} from '@mui/material';
import { createWikiDraft } from '../../services/ApiService';

function CreateWikiDraft() {
    const [selectedOption, setSelectedOption] = React.useState('option1');

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    }

    const formWikiAndSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const wikiname = data.get("wikiname")?.toString();
        const description = data.get("description")?.toString();
        const proponent = localStorage.getItem("USERNAME")?.toString();
        const wikiClassName = data.get("wikiClassName")?.toString();

        if (wikiname && description && proponent && wikiClassName) {
            createWikiDraft({ wikiname: wikiname, description: description, proponent: proponent, wikiClassName: wikiClassName });
        }
    }

    return (
        <Container maxWidth="sm">
            <form noValidate onSubmit={formWikiAndSubmit}>
                <Grid 
                    container 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} 
                >
                    <Grid 
                        item
                        sx={{
                            alignContent: 'center',
                        }}
                        xs={12}
                    >
                        Create a Draft for a New Wiki 
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            variant="outlined"
                            required
                            fullWidth
                            name="wikiname"
                            id="username"
                            label="Wiki Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField
                            label="Wiki Description"
                            multiline
                            rows={4}

                            fullWidth
                            name="description"
                            id="description"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <RadioGroup
                            name="wikiClassName"
                            id="wikiClassName"
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            <FormControlLabel
                                value="option1"
                                control={<Radio />}
                                label="Option 1"
                            />
                            <FormControlLabel
                                value="option2"
                                control={<Radio />}
                                label="Option 2"
                            />
                            <FormControlLabel
                                value="option3"
                                control={<Radio />}
                                label="Option 3"
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid 
                        item
                        sx={{alignContent: 'center',}}
                        xs={12}
                    >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Submit the Draft
                        </Button>
                    </Grid>
                    <Grid 
                        item
                        sx={{alignContent: 'center',}}
                        xs={12}
                    >
                        <Button
                            onClick={() => window.location.href='/'}
                        >
                            Revoke
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default CreateWikiDraft;

/*
                <Grid sx={{
                    
                }} 
                
                container spacing={2} justify="center" alignItems="center">
                    <Grid item xs={12} align="center">

                                        <Grid item xs={12} align="center">
*/