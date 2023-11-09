import React from 'react';
import { Node, mergeAttributes, CommandProps } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ImageComplementary from './ImageComplementary';

/* NOTE/TODO
    -> This is a custom node for image handling.
*/

interface optionsSrcAlt {
    src: string;
    alt?: string;
}

interface ImageCommands<RT> {
    imageRenderer: {
        setImage: (options: optionsSrcAlt) => RT;
    };
}

export interface ImageOptions {
    inline: boolean;
    HTMLAttribute: Record<string, any>;
}

const ImageNode = Node.create<ImageCommands<any>>({
    name: "image-related",
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

    // How this node should be parsed from HTML content: the tag 'image-renderer'
    // that has a 'src' attribute? IWAAIL.
    parseHTML() {
        return [
            {
                tag: "image-renderer[src]",
            },
        ];
    },

    // @ts-ignore
    addCommands() {
        return {
            setImage:   
                (options: optionsSrcAlt) =>
                ({ commands }: CommandProps) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: options,
                    });
                }
        };
    },

    renderHTML({ HTMLAttributes }) {
        return ["image-renderer", mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageComplementary);
    }


});

export default ImageNode;