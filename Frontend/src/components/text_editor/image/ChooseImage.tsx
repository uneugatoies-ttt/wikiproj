import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
} from '@mui/material';

import { Editor } from '@tiptap/core';

import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function ChooseImage({
    open,
    handleClose,
    editor,
    //inputs
}: {
    open: boolean,
    handleClose: () => void,
    editor: Editor,
    //inputs?: { src: string; alt: string },
}) {
    const [file, setFile] = React.useState<File | null>(null);

    // I think we can consolidate 'handleClose' and 'onButtonClick'.
    const onButtonClick = () => {
        if (file) {
            const alt = (document.getElementById('image-alt') as HTMLInputElement)?.value;
            const src = URL.createObjectURL(file);
            editor.chain().focus().setImage({ src, alt }).run();
            console.log('DONE');
        }
        handleClose();
        setTimeout(() => {
            setFile(null);
        }, 300);
    }

    const handleFileChange = () => {
        const [newFile] = (document.getElementById('image-input') as HTMLInputElement)?.files ?? [];
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
            <form encType="multipart/form-data">
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

                        <input 
                            id="image-input"
                            type="file"
                            onChange={handleFileChange}
                        />
                    
                        <TextField
                            style={{ marginTop: 15 }}
                            fullWidth
                            label="Photo Description"
                            required
                            name="alt"
                            id="image-alt"
                            autoFocus
                        />

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