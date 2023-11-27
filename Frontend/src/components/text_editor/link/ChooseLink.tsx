import React from 'react';

import { Editor } from '@tiptap/core';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

export default function ChooseLink({
    open,
    handleClose,
    editor,
}: {
    open: boolean
    handleClose: () => void,
    editor: Editor,
}) {

    const onButtonClick = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
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