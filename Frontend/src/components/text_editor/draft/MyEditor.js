import React, { useState } from 'react';
import { 
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  Modifier,
  SelectionState,
  DefaultDraftBlockRenderMap,
} from 'draft-js';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Immutable from 'immutable';

function MyEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Custom function to add a link to the selected text
  const addLink = (url) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithLink = Modifier.applyInlineStyle(contentState, editorState.getSelection(), 'LINK');
    const entityKey = contentStateWithLink.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithLink });
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey, url));
  };

  // Custom function to remove a link from selected text
  const removeLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const block = contentState.getBlockForKey(selection.getAnchorKey());
      const entityKey = block.getEntityAt(selection.getAnchorOffset());
      if (entityKey) {
        const newContentState = Modifier.applyEntity(contentState, selection, null);
        const newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');
        setEditorState(newEditorState);
      }
    }
  };

  const blockRenderMap = Immutable.Map({
    'unstyled': {
      element: 'div',   // for paragraphs
    },
    'header-one': {
      element: 'h1',    // for the top level heading
    },
    'header-two': {
      element: 'h2',    // for the second level heading
      // aliasedElements: ['h3'],   // if you want to make 'h3' be parsed into 'header-two'.
    },
    // other block types if needed
  });

  const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

  // Handle toolbar options
  const handleToolbar = (option) => {
    switch (option) {
      case 'add-link':
        const url = window.prompt('Enter the URL for the link:');
        if (url) {
          addLink(url);
        }
        break;
      case 'remove-link':
        removeLink();
        break;
      case 'paragraph':
        setEditorState(RichUtils.toggleBlockType(editorState, 'unstyled'));
        break;
      case 'heading1':
        setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
        break;
      case 'heading2':
        setEditorState(RichUtils.toggleBlockType(editorState, 'header-two'));
        break;
      default:
        break;
    }
  };

  const keyBindingFn = (e) => {
    return getDefaultKeyBinding(e);
  };

  // Handle key commands
  const handleKeyCommand = (command) => {
    if (command === 'remove-link') {
      removeLink();
      return 'handled';
    }
    return 'not-handled';
  };



  return (
    <div>
      <WysiwygEditor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: ['inline', 'list', 'link'], // Add 'link' option to the toolbar
          link: { addLink, removeLink },
        }}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={keyBindingFn}
        onToolbarClick={handleToolbar}
        blockRenderMap={extendedBlockRenderMap}
      />
    </div>
  );
}

export default MyEditor;





















/*
import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, Modifier, SelectionState } from 'draft-js';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function MyEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Custom function to add a link to the selected text
  const addLink = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithLink = Modifier.applyInlineStyle(contentState, editorState.getSelection(), 'LINK');
    const entityKey = contentStateWithLink.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithLink });
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
  };

  // Handle toolbar options
  const handleToolbar = (option) => {
    switch (option) {
      case 'add-link':
        const url = window.prompt('Enter the URL for the link:');
        if (url) {
          addLink();
        }
        break;
      default:
        break;
    }
  };

  const handleKeyCommand = () => {

  }
  

  // key binding to handle link removal with the Backspace key
  const keyBindingFn = (e) => {
    if (e.keyCode === 8) {
        const contentState = editorState.getCurrentContent();
        const selection = editorState.getSelection();
        const block = contentState.getBlockForKey(selection.getAnchorKey());
        const entityKey = block.getEntityAt(selection.getAnchorOffset());

        if (entityKey) {
            const entity = contentState.getEntity(entityKey);
            const entityType = entity.getType();
            if (entityType === 'LINK') {
                return 'remove-link';
            } else {
                return getDefaultKeyBinding(e);
            }
        }
    }

    return getDefaultKeyBinding(e);
  };

  return (
    <div>
      <WysiwygEditor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: ['inline', 'list', 'link'], // Add 'link' option to the toolbar
          link: { addLink },
        }}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={keyBindingFn}
        onToolbarClick={handleToolbar}
      />
    </div>
  );
}

export default MyEditor;*/


// 
/*
  const handleKeyCommand = (command, currentEditorState) => {
    if (command === 'remove-link') {
      const selection = currentEditorState.getSelection();
      if (!selection.isCollapsed()) {
        // Handle non-collapsed selection (removing selected link)
        const contentState = currentEditorState.getCurrentContent();
        const withoutLink = Modifier.removeInlineStyle(contentState, selection, 'LINK');
        const newEditorState = EditorState.push(currentEditorState, withoutLink, 'change-inline-style');
        setEditorState(newEditorState);
        return 'handled';
      } else {
        // Handle collapsed selection (cursor inside the link)
        const contentState = currentEditorState.getCurrentContent();
        const block = contentState.getBlockForKey(selection.getStartKey());
        const entityKey = block.getEntityAt(selection.getStartOffset());
        if (entityKey) {
          const entity = contentState.getEntity(entityKey);
          const entityType = entity.getType();
          if (entityType === 'LINK') {
            // Remove the link entity
            const newContentState = Modifier.applyEntity(contentState, selection, null);
            const newEditorState = EditorState.push(currentEditorState, newContentState, 'apply-entity');
            setEditorState(newEditorState);
            return 'handled';
          }
        }
      }
    }
    return 'not-handled';
  };

*/