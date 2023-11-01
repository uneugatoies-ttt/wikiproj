import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from '@mui/material';

const Drafts = (props) => {
    const [draft, setDraft] = React.useState(props.draft);

    const confirmWikiInitializationHandler = () => {
        props.confirmWiki(draft);
    };

    return (
        <ListItem>
            <ListItemText>
                {draft.wikiname} | {draft.description} | {draft.proponent}
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton 
                    aria-label="Confirm Wiki Initialization"
                    onClick={confirmWikiInitializationHandler}
                >
                    confirm
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default Drafts;