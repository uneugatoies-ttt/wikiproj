import React from 'react';
import TiptapEditor from '../../../components/text_editor/tiptap/TiptapEditor';
import { Button } from '@mui/material';
import { insertArticle } from '../../../services/ApiService';


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
        /* 
        const data = new FormData(event.target);
        const path = window.location.pathname;
        const parts = path.split('/');
        const wikiname = parts[1];
        const title = data.get("title");
        */

        console.log(contents);

        const wikiname = 'wiki002';
        const title = 'example article title';
        const contentString = JSON.stringify(contents);
        const currUser = localStorage.getItem("USERNAME");
        const authors = [currUser];

        console.log(contentString);


        
        insertArticle({
            wikiname: wikiname,
            title: title,
            content: contentString,
            authors: authors
        })
            .then((response) => {
                console.log(response);
            }
        );
    }

    const editArticle = () => {

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