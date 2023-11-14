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
import { Image } from '@tiptap/extension-image';

import { Container } from '@mui/material';

import MenuBar from './MenuBar';

import './tiptapStyles.scss';
import { ArticleDTO } from '../../../services/ApiService';

/* NOTE/TODO
  > Why can't you get the 'editor' by calling useCurrentEditor() at 'TiptapEditor'
  and 'Practices', while you actually can do that within 'MenuBar' and
  'ParagraphHeadingDropdown'? This is weird.

  > Giving the content:
    > as HTML: the data must be given in the form of string.
    > as JSON: the data should be raw JSON data.
*/


interface TiptapEditorProps {
  content: string;
  creationFlag: boolean;
  createNewArticle: (contents: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content,
  creationFlag,
  createNewArticle
}) => {

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({  }),
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
    Image.configure({
      // If you don't want to inject images to the article as blocks, then 'inline' should be true.
      //inline: true,
      HTMLAttributes: {
        class: 'tiptap-editor-images'
      },
      
    })
  ]
  
  const editor = useEditor({
    extensions: extensions,
    content: content,
  })



  return (
    <Container component="main" sx={{
        marginTop: "3%",
        width: 'auto'
      }}
    >

      <MenuBar
        creationFlag={creationFlag}
        createNewArticle={createNewArticle} 
        editor={editor}
      />

      <EditorContent editor={editor} />


    </Container>
  );
};

export default TiptapEditor;