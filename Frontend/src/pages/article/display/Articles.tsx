import React, { useEffect, useState } from 'react';

import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
    Container,
  } from '@mui/material';

import './for_article_display.scss';

/* NOTE & TODO

    -> Why does 'tiptapStyles.scss' affect this component? 

    -> I initially tried to do something very confusing with rendering a stored article.
    But you didn't need to do that at all; you had to just use the attribute
    'editable={false}' while using the editor like when you use it in creating and editing an article.

    -> Remember when you enter a wikiname in a URL, all characters should be 
    lowercase, and the whitespace must be replaced with '-'.

    -> If the article doesn't exist, then inform the user;
    do not throw any error. 

    -> TypeScript로 넘어오며 <EdictorProvider>에 'children'을 명시하라고 해서 했지만,
    이것이 무슨 역할을 하는지는 아직 불명이다.
*/

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ }),
    StarterKit.configure({
        bulletList: {
        keepMarks: true,
        keepAttributes: false,
        },
        orderedList: {
        keepMarks: true,
        keepAttributes: false,
        },
    }),
];

function Articles(props: { articleData: string }) {
    if (props.articleData) {
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
                children
                editable={false}
                extensions={extensions}
                content={props.articleData}
            />
        </Container>
        )
    } else {
        return <div>not defined?</div>;
    }
}

export default Articles;