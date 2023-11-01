import React from 'react';
import { Container, List } from '@mui/material';
import { createWiki, call } from '../../services/ApiService';
import Drafts from './Drafts';

function WikiDrafts() {
    const [drafts, setDrafts] = React.useState([]);
    const [reload, setReload] = React.useState(true);


    const fetchDrafts = async () => {
        try {
            const response = await call("/wiki/draft", "GET", null);
            setDrafts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const confirmWiki = async (draft) => {
        try {
            await createWiki(draft)
            await call("/wiki/draft", "DELETE", draft.wikiCandidateId);
            setDrafts((prevDrafts) => prevDrafts.filter(item => item.id !== draft.id));
            setReload(true);
        } catch (error) {
            console.log(error);
        }
    }
            
    React.useEffect(() => {
        if (reload) {
            fetchDrafts().then(() => setReload(false));
        }
    }, [reload]);


    return (
        <Container>
            <List>
                {drafts.map((draft) => (
                    <Drafts 
                        key={draft.id}
                        draft={draft}
                        confirmWiki={confirmWiki}
                    />
                ))}
            </List>
        </Container>
    );
   
}

export default WikiDrafts;