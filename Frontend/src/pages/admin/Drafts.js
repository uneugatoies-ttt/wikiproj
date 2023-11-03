import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from '@mui/material';

/*
    This component is for displaying the current drafts in the queue,
    so that the administrator can approve the initiative of the corresponding wiki.
*/

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