import React from 'react';
import { Node, mergeAttributes, CommandProps, RawCommands } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ImageComponent from './ImageComponent';

import ImageFrame1 from '../imgframes/ImageFrame1';

interface optionsSrcAlt {
    src: string;
    alt?: string;
}

interface ImageCommands<ReturnType> {
    imageRenderer: {
        setImageCustom: (options: optionsSrcAlt) => ReturnType;
    };
}

export interface ImageOptions {
    inline: boolean;
    HTMLAttribute: Record<string, any>;
}

const ImageNode = Node.create<ImageCommands<any>>({
    name: "image-renderer",
    group: "block",
    content: "block+",
    inline: false,
    draggable: true,

    // Define attributes for the image node.
    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
        };
    },

    // Does this let this node be parsed as the tag 'image-renderer' that has a 'src' attribute? I don't know.
    parseHTML() {
        return [
            {
                tag: "image-renderer[src]",
            },
        ];
    },

    /*
    //@ts-ignore
    addCommands() {
        return {
            setImageCustom: (options: optionsSrcAlt) => {
                return ({ commands }: CommandProps): boolean => {
                    return commands.insertContent({
                        type: "img",
                        attrs: options,
                    });
                };
            },
        };
    },*/


    renderHTML({ HTMLAttributes }) {
        return ["image-renderer", mergeAttributes(HTMLAttributes)];
    },
    
    addNodeView() {
        return ReactNodeViewRenderer(ImageComponent);
    }

});

export default ImageNode;