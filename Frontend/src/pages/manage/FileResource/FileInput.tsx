import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { isFilenamePresent, FileDTO, insertImage } from '../../../services/ApiService';

export default function ChooseFile({
    open,
    handleClose,
}: {
    open: boolean,
    handleClose: () => void,
}) {
    const [file, setFile] = React.useState<File | null>(null);
    const [selectedOption, setSelectedOption] = React.useState('image');

    const onButtonClick = async () => {
        const filename = (document.getElementById('filename') as HTMLInputElement)?.value;

        console.log(filename);

        if (filename) {
            try {
                const isPresent = await isFilenamePresent(filename);

                if (isPresent) {
                    console.log('Filename already exists');
                } else {
                    //const fileInput = document.getElementById('fileInput') as HTMLInputElement;
                    //const file = fileInput.files?.[0];
                        
                    const uploader = localStorage.getItem('USERNAME');
                    const description = document.getElementById('description')?.nodeValue?.toString();
                    const fileType = document.getElementById('fileType')?.nodeValue?.toString();
                    const wikiname = window.location.pathname.split('/')[1];
        
                    if (file && uploader && description && fileType && wikiname) {
                        const formData = new FormData();
                        formData.append('file', file);
                        
                        const fileDTO: FileDTO = {
                            filename: filename,
                            uploader: uploader,
                            description: description,
                            fileType: fileType,
                            wikiname: wikiname,
                        }
        
                        formData.append('fileDTO', new Blob([JSON.stringify(fileDTO)], { type: 'application/json' }));
        
                        console.log(formData);

                        //insertImage(formData);

                        handleClose();
                        setTimeout(() => {
                            setFile(null);
                        }, 300);
                    } else {
                        console.error('No file selected');
                    }
                }
            } catch (error) {
                console.error(error);
            }
            
        } else {
            console.error('Error with filename');
        }
    }

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    }

    const handleFileChange = () => {
        const [newFile] = (document.getElementById('fileInput') as HTMLInputElement)?.files ?? [];
        setFile(newFile);
        if (newFile) {
            const lazyLoadImage = document.getElementById('image-preview-lazy-load') as HTMLImageElement | null;
            if (lazyLoadImage) {
                lazyLoadImage.src = URL.createObjectURL(newFile);
                lazyLoadImage.loading = 'eager';
            }
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll="body"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth
        >
            <DialogTitle id="scroll-dialog-title">Insert Image</DialogTitle>

            <form id="fileUploadForm" encType="multipart/form-data">
                <DialogContent dividers>

                    <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <LazyLoadImage
                            id="image-preview-lazy-load"
                            alt=""
                            effect="blur"
                            style={
                                (file) ? ({
                                    maxWidth: '100%',
                                    height: 'auto',
                                }) : ({
                                    width: "auto",
                                    height: "auto"
                                })
                            }
                            src={file ? URL.createObjectURL(file) : '#'}
                        />
                    </div>

                    <Grid>
                        <input 
                            type="file" 
                            name="fileInput" 
                            id="fileInput" 
                            onChange={handleFileChange}
                        />
                    </Grid>

                    <Grid>
                        <TextField 
                            id="filename"
                            style={{ marginTop: 15 }}
                            fullWidth
                            label="Name for This File"
                            required
                            name="filename"
                            autoFocus
                        />
                    </Grid>

                    <TextField
                        style={{ marginTop: 15 }}
                        fullWidth
                        label="Description for This File"
                        required
                        name="alt"
                        id="description"
                        autoFocus
                    />

                    <Grid item xs={12}>
                        <RadioGroup
                            name="fileType"
                            id="fileType"
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            <FormControlLabel
                                value="image"
                                control={<Radio />}
                                label="Image"
                            />
                            <FormControlLabel
                                value="audio"
                                control={<Radio />}
                                label="Audio"
                            />
                            {/* maybe I will implement videos and other things like executables */}
                        </RadioGroup>
                    </Grid>

                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={onButtonClick}
                    >
                        Save
                    </Button>
                    
                </DialogActions>
            </form>
        </Dialog>
    )
}