import React from 'react';
import TiptapEditor from '../../../components/text_editor/tiptap/TiptapEditor';
import { Button } from '@mui/material';
import { insertArticle } from '../../../services/ApiService';

/*  NOTE/TODO
    -> Currently I'm giving a function as one of props and 
    making the lower component call it when it is needed,
    but I'm not sure whether this is a reasonable way to do this or not. 

*/

const CreateArticlePractice = () => {
    const [creationFlag, setFlag] = React.useState(false);

    React.useEffect(() => {
      setFlag(false);
    }, [creationFlag]);
  
    const retrieveContent = () => {
      console.log("asdfasdf");
      setFlag(true);
    }

    const createNewArticle = (contents) => {
        console.log(contents);

        const wikiname = 'Wiki Example';
        const title = 'example article title';
        const contentString = contents;
        const lastEditor = localStorage.getItem("USERNAME");
        const versionMemo = 'creating a new article example'

        console.log(contentString);
        
        insertArticle({
            wikiname: wikiname,
            title: title,
            content: contentString,
            lastEditor: lastEditor,
            versionMemo: versionMemo,
        })
            .then((response) => {
                console.log(response);
            }
        );
    }

    const content = {      
        "type": "doc",
        "content": [
        {
            "type": "paragraph",
            "content": [
            {
                "type": "text",
                "text": "Example Text\nasdf"
            }
            ]
        },
        {
            "type": "paragraph",
            "content": [
            {
                "type": "text",
                "text": "oOOOOO"
            }
            ]
        }
        ]
    };
  
    return (
        <div>
            <TiptapEditor 
                content={content} 
                creationFlag={creationFlag}
                createNewArticle={createNewArticle}
            />
            <Button
                onClick={() => retrieveContent()}
            >
            CONFIRM
            </Button>
        </div>
    );
}

export default CreateArticlePractice;