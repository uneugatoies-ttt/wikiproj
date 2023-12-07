import React from 'react';

import { 
  useEditor,
  EditorContent,
  ReactNodeViewRenderer,
} from '@tiptap/react';
import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

import { Container } from '@mui/material';

import MenuBar from './MenuBar';

import ImageView from './image/ImageView';

import './tiptapStyles.scss';

/* NOTE/TODO
  > Why can't you get the 'editor' by calling useCurrentEditor() at 'TiptapEditor'
  and 'Practices', while you actually can do that within 'MenuBar' and
  'ParagraphHeadingDropdown'? This is weird.

  > Giving the content:
    > as HTML: the data must be given in the form of string.
    > as JSON: the data should be raw JSON data.
*/
/*
const CustomImage = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },
});*/

const CustomLink = Link.extend({

});

interface TiptapEditorProps {
  content: string;
  flag: boolean;
  calledWhenFlagIsTrue: (contents: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, flag, calledWhenFlagIsTrue }) => {
  React.useEffect(() => {
    if (flag) {
      calledWhenFlagIsTrue(JSON.stringify(editor?.getJSON()));
    }
  }, [flag]);

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
    //CustomImage,
    CustomLink,
  ];

  // If the error that says something like "type undefined", then check the 'extensions' variable once again;
  // there maybe an additional (needless) comma within the array.
  
  // It is 'content'; not 'contents'.
  const editor = useEditor({
    extensions: extensions,
    content: content,
  })

  if (!editor) {
    return null;
  }

  return (
    <Container component="main" sx={{
        marginTop: "3%",
        width: 'auto'
      }}
    >

      <MenuBar
        editor={editor}
      />

      <EditorContent editor={editor} />

    </Container>
  );
};

export default TiptapEditor;