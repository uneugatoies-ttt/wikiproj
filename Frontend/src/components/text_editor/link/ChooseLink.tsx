import React from 'react';

import { Editor } from '@tiptap/core';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

export default function ChooseLink({
    open,
    handleClose,
    editor,
}: {
    open: boolean,
    handleClose: () => void,
    editor: Editor,
}) {
    const [url, setUrl] = React.useState<string>('');
    const [isValidUrl, setIsValidUrl] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (open === true) {
            const previousUrl = editor.getAttributes('link').href;
            if (previousUrl && previousUrl !== '') {
                setUrl(previousUrl);
                setIsValidUrl(true);
                console.log(`we've entered useEffect's if`);
            } else {
                setUrl('');
                setIsValidUrl(false);
                console.log(`we've entered useEffect's else`);
            }
        } else {
            setTimeout(() => {
                setUrl('');
                setIsValidUrl(false);
                console.log(`we've entered 'setTimeout'`);
            }, 300);
        }
    }, [open]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setUrl(inputValue);
        try {
            new URL(inputValue);
            console.log('valid url');
            setIsValidUrl(true);
        } catch (error) {
            setIsValidUrl(false);
        }
    }

    const onButtonClick = () => {
        if (isValidUrl) {
            if (url === null) {
                return;
            } 
            if (url === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run();
                return;
            }
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();

            handleClose();

        }
    }
    

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll="body"
            fullWidth
        >
            <DialogTitle id="scroll-dialog-title">Embed Link</DialogTitle>

            <DialogContent>
                <TextField
                    style={{ marginTop: 15 }}
                    value={url}
                    fullWidth
                    label="URL"
                    name="link-url"
                    id="link-url"
                    autoFocus
                    onChange={handleInputChange}
                />
                {
                    isValidUrl ? (
                        null
                    ) : (
                        <p style={{ color: 'red' }}>Please enter a valid URL</p>
                    )
                }
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onButtonClick}
                >
                    Confirm
                </Button>
            </DialogActions>

        </Dialog>
    )

}