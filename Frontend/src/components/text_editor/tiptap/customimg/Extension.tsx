/*
import React, { useRef, useEffect } from 'react';
import { Editor, Node, NodeView } from '@tiptap/core';

interface CustomImageViewProps {
  editor: Editor;
  node: Node;
  updateAttributes: (attrs: Record<string, any>) => void;
}

const CustomImageView: React.FC<CustomImageViewProps> = ({ editor, node, updateAttributes }) => {
  const imageUrl = node.attrs.src;

  const handleClick = () => {
    // Handle click event if needed
  };

  return (
    <div
      style={{
        // Add any custom styling you need for the wrapper
        border: '1px solid #ccc',
        padding: '8px',
        margin: '8px 0',
      }}
      onClick={handleClick}
    >
      <img
        src={imageUrl}
        alt={node.attrs.alt}
        style={{
          // Add any custom styling you need for the image
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

export const customImage = () => {
  return new Node({
    name: 'customImage',
    group: 'block',
    content: 'inline*',
    inline: true,
    draggable: true,
    atom: true,
    attrs: {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
    },
    parseHTML() {
      return [
        {
          tag: 'div.custom-image-wrapper',
          getAttrs: (dom) => {
            if (typeof dom === 'string') {
              return {};
            }
            return {
              src: dom.querySelector('img')?.getAttribute('src'),
              alt: dom.querySelector('img')?.getAttribute('alt'),
            }},
        },
      ];
    },
    renderHTML({ node }) {
      return [
        'div',
        { class: 'custom-image-wrapper' },
        [
          'img',
          {
            src: node.attrs.src,
            alt: node.attrs.alt,
          },
        ],
      ];
    },
    addNodeView() {
      return (node: Node, view: NodeView, getPos: () => number) => {
        return CustomImageView({
          editor: view.editor as Editor,
          node,
          updateAttributes: (attrs) => {
            view.dispatch(view.state.tr.setNodeMarkup(getPos(), null, attrs));
          },
        });
      };
    },
  });
};
*/