import React, { useEffect, useState } from 'react';
import { selectArticleByWikinameAndTitle } from '../../../services/ApiService';
import { useParams } from 'react-router-dom';
import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
    Container,
  } from '@mui/material';

import './for_article.scss';

/* NOTE & TODO
    -> Why does 'tiptapStyles.scss' affect this component? 

    -> I initially tried to do something very confusing with rendering a stored article.
    But you didn't need to do that at all; you had to just use the attribute
    'editable={false}' while using the editor like when you use it in creating and editing an article.

    -> Remember when you enter a wikiname in a URL, all characters should be 
    lowercase, and the whitespace must be replaced with '-'.

    -> If the article doesn't exist, then inform the user;
    do not throw any error. 
*/

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
        keepMarks: true,
        keepAttributes: false,
        },
        orderedList: {
        keepMarks: true,
        keepAttributes: false,
        },
        all: {
        className: 'asdf',
        },
    }),
];

function Articles() {
    const [articleData, setArticleData] = useState(null);

    const params = useParams();
    const wikiname = params.wikiname;
    const title = params.arti;

    useEffect(() => {
        selectArticleByWikinameAndTitle(wikiname, title)
            .then((response) => {
                setArticleData(JSON.parse(response.content));
            });
    }, []);

    if (articleData) {
        return (
        <Container
            className="article-display-container"
            component="main" 
            sx={{
                marginTop: "3%",
                width: 'auto'
            }}
        >
            <EditorProvider
                
                editable={false}
                extensions={extensions}
                content={articleData}
            />
        </Container>
        )
    } else {
        return null;
    }


    /*
    const displayArticle = (articleHtml) => {
        setHtmlParsed(articleHtml);
    }
    
    if (htmlParsed) {
        return (
            <EditorProvider
                editable={false}
                extensions={extensions}
                content={articleData}
            />
        )
    } else if (articleData) {
        return (
            <div>
                <div>FETCHING INCOMPLETE</div>;
                <div className="editor-hidden">
                    <EditorProvider
                        slotBefore={
                            <DisplayArticle
                                displayArticle={displayArticle}
                            />
                        }
                        extensions={extensions}
                        content={articleData}
                    />
                </div>
            </div>
        );
    } else {
        return <div>FETCHING INCOMPLETE</div>;
    }*/
}

export default Articles;