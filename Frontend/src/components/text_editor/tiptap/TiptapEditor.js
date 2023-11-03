import React from 'react';

import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { 
  useCurrentEditor,
  EditorProvider,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
  Container,
} from '@mui/material';
import MenuBar from './MenuBar';

// currently, it seems that the only styling that is
// actually applied to this component is for 'code block'.
import './tiptapStyles.scss';




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
]


/*
const schema = getSchema([
  Document,
  Paragraph,
  Text,
])
*/



/* 
  > Why can't you get the 'editor' by calling useCurrentEditor()
  at 'TiptapEditor' and 'Practices', while you actually can do that
  within 'MenuBar' and 'ParagraphHeadingDropdown'?
  This is weird.


*/

const TiptapEditor = (prop) => {


  const { editor } = useCurrentEditor();

  
  //const schema = editor.schema;


  /*  
    > Giving the content as HTML: the data must be given in the form of string.
    > Giving the content as JSON: the data should be raw JSON data.
  */


  return (
    <Container component="main" sx={{
        marginTop: "3%",
        width: 'auto'
      }}
    >
      <EditorProvider
        slotBefore={
          <MenuBar 
            creationFlag={prop.creationFlag}
            createNewArticle={prop.createNewArticle} 
            justflag={prop.justflag}
          />
        }
        extensions={extensions}
        content={prop.content}
      >

      </EditorProvider>
    </Container>
  )
};

export default TiptapEditor;