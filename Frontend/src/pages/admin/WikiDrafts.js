import React from 'react';
import { Container, List } from '@mui/material';

import { createWiki, deleteWikiDraft, fetchDrafts } from '../../services/ApiService';
import Drafts from './Drafts';

function WikiDrafts() {
    const [drafts, setDrafts] = React.useState([]);
    const [reload, setReload] = React.useState(true);

    const confirmWiki = async (draft) => {
        try {
            const [createdWiki, deletedDraft] = await Promise.all([
                createWiki(draft),
                deleteWikiDraft(draft.wikiCandidateId),
            ]);

            console.log('Created Wiki:', createdWiki);
            console.log('Deleted Draft:', deletedDraft);

            setDrafts((prevDrafts) => prevDrafts.filter(item => item.id !== draft.id));
            setReload(true);
        } catch (error) {
            console.log('Error with using confirmWiki():', error);
            throw error;
        }
    }
            
    React.useEffect(() => {
        if (reload) {
            fetchDrafts().then((result) => {
                setDrafts(result);
                setReload(false);
            });
        }
    }, [reload]);

    return (
        <Container>
            <List>
                {drafts.map((draft) => <Drafts key={draft.id} draft={draft} confirmWiki={confirmWiki}/>)}
            </List>
        </Container>
    );
}

export default WikiDrafts;