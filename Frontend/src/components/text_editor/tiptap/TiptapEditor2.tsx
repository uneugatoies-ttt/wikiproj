/*
import React from 'react';

import { 
  EditorProvider,
  useEditor,
  Editor,
  EditorContent,
} from '@tiptap/react';
import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';

import { Container } from '@mui/material';

import MenuBar from './MenuBar';
import Image from './Image';

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
  }),
  Image,
]

const editor = useEditor({
  extensions: extensions,
})

interface TiptapEditorProps {
  content: string;
  creationFlag: boolean;
  createNewArticle: (contents: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, creationFlag, createNewArticle }) => {
  return (
    <Container component="main" sx={{
        marginTop: "3%",
        width: 'auto'
      }}
    >
      <EditorProvider
        slotBefore={
          <MenuBar 
            creationFlag={creationFlag}
            createNewArticle={createNewArticle} 
            editor={editor}
          />
        }
        extensions={extensions}
        content={content}
      >

      </EditorProvider>
    </Container>
  );
};

export default TiptapEditor;*/