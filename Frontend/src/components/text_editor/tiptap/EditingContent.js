/* NOTE:
  -> What was this component for? This sounds very stupid, but I couldn't remember...


*/

/*
import React from 'react';
import { useCurrentEditor, useContent, EditorContent } from '@tiptap/react';

const EditingContent = () => {
  const editor = useCurrentEditor();
  const content = useContent();

  // Example: Custom styles for a specific node type
  const customNodeStyles = {
    'heading': 'font-weight: bold; font-size: 24px; margin-bottom: 10px;',
    'paragraph': 'font-size: 16px; line-height: 1.5; margin-bottom: 20px;',
    // Add more node types as needed
  };

  // Function to apply custom styles to specific nodes
  const applyCustomStyles = (node) => {
    if (node.type.name in customNodeStyles) {
      return `style="${customNodeStyles[node.type.name]}"`;
    }
    return '';
  };

  return (
    <div>
      <div className="editor-content" dangerouslySetInnerHTML={{ __html: content }}>

        {editor?.view?.state.doc.descendants((node, pos) => {
          if (node.isBlock) {
            return ` <${node.type.name} ${applyCustomStyles(node)}>${node.textContent}</${node.type.name}>`;
          }
          return node.textContent;
        })}
      </div>
    </div>
  );
};

export default EditingContent;*/
