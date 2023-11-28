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
    Typography
} from '@mui/material';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { isFileNamePresent, FileDTO, insertImage } from '../../../components/services/ApiService';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export default function ChooseFile({
    open,
    handleClose,
}: {
    open: boolean,
    handleClose: () => void,
}) {
    const [file, setFile] = React.useState<File | null>(null);
    const [selectedOption, setSelectedOption] = React.useState('image');
    const [uploadProgress, setUploadProgress] = React.useState<ReactJSXElement | null>(null);
    const [beingProgressed, setBeingProgressed] = React.useState('initial');

    React.useEffect(() => {
        if (beingProgressed !== 'initial') {
            uploadProgressConfig();
        }
    }, [beingProgressed]);

    const onButtonClick = async () => {
        const fileName = (document.getElementById('fileName') as HTMLInputElement)?.value;
        const usedInThisWiki = window.location.pathname.split('/')[2];
        console.log(fileName, usedInThisWiki);

        if (fileName && usedInThisWiki) {
            try {
                const isPresent = await isFileNamePresent(fileName, usedInThisWiki);

                if (isPresent) {
                    console.log('FileName already exists');
                } else {
                    //const fileInput = document.getElementById('fileInput') as HTMLInputElement;
                    //const file = fileInput.files?.[0];
                        
                    const uploader = localStorage.getItem('USERNAME');
                    const description = (document.getElementById('description') as HTMLInputElement)?.value;
                    const fileType = selectedOption;


                    console.log(file);
                    console.log(uploader);
                    console.log(description);
                    console.log(fileType);
                    console.log(usedInThisWiki);
        
                    if (file && uploader && description && fileType) {
                        const formData = new FormData();
                        formData.append('file', file);
                        
                        const fileDTO: FileDTO = {
                            fileName: fileName,
                            uploader: uploader,
                            description: description,
                            fileType: fileType,
                            usedInThisWiki: usedInThisWiki,
                        }
        
                        formData.append('fileDTO', new Blob([JSON.stringify(fileDTO)], { type: 'application/json' }));
        
                        console.log(formData);

                        setBeingProgressed('true');
                        
                        const result = await insertImage(formData);

                        console.log(result);
                        console.log(`it's over`);
                        setBeingProgressed('false');

                        setTimeout(() => {
                            handleClose();
                            setTimeout(() => {
                                setFile(null);
                                setUploadProgress(null);
                            }, 300);
                        }, 1800);
                    } else {
                        console.error('No file selected');
                    }
                }
            } catch (error) {
                console.error(error);
            }
            
        } else {
            console.error('Error with fileName');
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

    const uploadProgressConfig = () => {
        if (beingProgressed === 'true') {
            setUploadProgress( 
                <Grid>
                    <Typography color="grey">
                        UPLOAD BEING PROGRESSED...                            
                    </Typography>
                </Grid>
            );
        } else {
            setUploadProgress(
                <Grid>
                    <Typography color="blue">
                        UPLOAD COMPLETE!
                    </Typography>
                </Grid>
            );
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
                            id="fileName"
                            style={{ marginTop: 15 }}
                            fullWidth
                            label="Name for This File"
                            required
                            name="fileName"
                        />
                    </Grid>

                    <Grid>
                        <TextField
                            style={{ marginTop: 15 }}
                            fullWidth
                            label="Description for This File"
                            required
                            name="alt"
                            id="description"
                        />
                    </Grid>

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
                    {uploadProgress}
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