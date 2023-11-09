import React from 'react';

import { 
  Editor
  //useCurrentEditor
} from '@tiptap/react';

import { 
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Grid,
} from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatStrikethrough,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Undo,
  Redo,
  Code,
  Highlight,
  Image,
} from '@mui/icons-material';

import ParagraphHeadingDropdown from './ParagraphHeadingDropdown';
import PickImage from './renderer/ImageRenderer';


/* NOTE/TODO
  -> I can't remember where the prop 'intoHtml' was being used. IWAAIL

  -> For some reason, after I switched the file's extensions into .tsx, I couldn't use 
  the useCurrentEditor(); I had to changed the way of manipulating the editor so MenuBar
  can get it from the argument. IWAAIL.

  -> Is the attribute 'className' unusable in a TypeScript-using component?
*/


const MenuBar = ({ 
  creationFlag, createNewArticle, editor
}: {
  creationFlag: boolean,
  createNewArticle: (contents: string) => void,
  editor: Editor, 
}) => {
  const [openPickImage, setOpenPickImage] = React.useState(false);

  /*
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }*/

  if (creationFlag) {
    console.log(editor.getJSON());
    createNewArticle(JSON.stringify(editor.getJSON()));
  }

  return (
    <div className="buttonswrapping">
    <Grid container className="wrappingGrid" justifyContent="center" alignItems="center">
      
      <Paper>
        <ParagraphHeadingDropdown 
          editor={editor}
        />
      </Paper>

      <Paper>
        <ToggleButtonGroup>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? 'is-active' : ''}
            value={`what value should be given?`}
          >
            <FormatBold>
              bold
            </FormatBold>
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={editor.isActive('italic') ? 'is-active' : ''}
            value={`what value should be given?`}
          >
            <FormatItalic>
              italic
            </FormatItalic>
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={editor.isActive('strike') ? 'is-active' : ''}
            value={`what value should be given?`}
          >
            <FormatStrikethrough>
            strike
            </FormatStrikethrough>
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleCode()
                .run()
            }
            className={editor.isActive('code') ? 'is-active' : ''}
            value={`what value should be given?`}
          >
            <Highlight>
              highlight
            </Highlight>
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>

      <Paper>
        <ToggleButtonGroup>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
            value={`what value should be given?`}
          >
            <FormatListBulleted>
              bullet list
            </FormatListBulleted>
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
            value={`what value should be given?`}
          >
            <FormatListNumbered>
              ordered list
            </FormatListNumbered>
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
      <Paper>
        <ToggleButtonGroup>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
            value={`what value should be given?`}
          >
            <Code>
              code block
            </Code>
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
            value={`what value should be given?`}
          >
            <FormatQuote>
              blockquote
            </FormatQuote>
          </ToggleButton>




          <ToggleButton
            onClick={() => setOpenPickImage(true)}
            selected={editor.isActive("image-renderer")}
            value="image-renderer"
            aria-label="iamge-renderer"
          >
            <Image/>
          </ToggleButton>

          <PickImage
            open={openPickImage}
            handleClose={() => setOpenPickImage(false)}
            setThumbnail={(value: {src: string; alt?: string }) => {
              editor
                .chain()
                .focus()
                // @ts-ignore
                .setImage({ src: value.src, alt: value.alt })
                .run();
            }}
          />

          
          
          <ToggleButton 
            onClick={() => editor.chain().focus().setHardBreak().run()}
            value={`what value should be given?`}
          >
            hard break
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
            value={`what value should be given?`}
          >
            <Undo>
              undo
            </Undo>
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
            value={`what value should be given?`}
          >
            <Redo>
              redo
            </Redo>
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </Grid>
    </div>
  );
}

export default MenuBar;