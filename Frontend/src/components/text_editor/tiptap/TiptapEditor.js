import React from 'react';
import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { 
  useCurrentEditor,
  EditorProvider,
  EditorContent,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
  Container,
} from '@mui/material';
import MenuBar from './MenuBar';
import EditingContent from './EditingContent';

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

const TiptapEditor = (content) => {
  const { editor } = useCurrentEditor();


  return (
    <Container component="main" sx={{
        marginTop: "3%",
        width: 'auto'
      }}
    >
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
      >

      </EditorProvider>
    </Container>
  )
};

export default TiptapEditor;