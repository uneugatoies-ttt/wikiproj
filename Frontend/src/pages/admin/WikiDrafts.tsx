import React from 'react';
import { Container, List } from '@mui/material';

import { createWiki, deleteWikiDraft, fetchWikiDrafts, WikiAndWikiDraftDTO } from '../../components/services/ApiService';
import Drafts from './Drafts';

function WikiDrafts() {
    const [drafts, setDrafts] = React.useState<WikiAndWikiDraftDTO[]>([]);
    const [reload, setReload] = React.useState(true);

    const confirmWiki = async (draft: WikiAndWikiDraftDTO) => {
        try {
            const [createdWiki, deletedDraft] = await Promise.all([
                createWiki(draft),
                deleteWikiDraft(draft.wikiCandidateId as number),
            ]);

            console.log('Created Wiki:', createdWiki);
            console.log('Deleted Draft:', deletedDraft);

            setDrafts((prevDrafts) => prevDrafts.filter(item => item.wikiId !== draft.wikiId));
            setReload(true);
        } catch (error) {
            console.log('Error with using confirmWiki():', error);
            throw error;
        }
    }
    
    React.useEffect(() => {
        if (reload) {
            fetchWikiDrafts()
                // @ts-ignore
                .then((result: WikiAndWikiDraftDTO[]) => {
                    setDrafts(result);
                    setReload(false);
                });
        }
    }, [reload]);

    return (
        <Container>
            <List>
                {drafts.map((draft) => <Drafts key={draft.wikiId} draft={draft} confirmWiki={confirmWiki}/>)}
            </List>
        </Container>
    );
}

export default WikiDrafts;