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

interface ImageCommands<ReturnType> {
    imageRenderer: {
        setImage: (options: optionsSrcAlt) => ReturnType;
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

    // How should this node be parsed from HTML content: the tag 'image-renderer' that has a 'src' attribute? IWAAIL.
    parseHTML() {
        return [
            {
                tag: "image-renderer[src]",
            },
        ];
    },



    
    // I guess, 'commands.insertContent()' inserts the entered image as HTML into this article.
    // @ts-ignore
    addCommands() {
        return {
            setImage:   
                (options: optionsSrcAlt) =>
                ({ commands }: CommandProps) => {
                    return commands.insertContent({
                        //content: [/* I have to fill this */],
                        // Initially the 'type' was set as 'this.name', which I cannot understand
                        // the reason behind it.
                        type: "img",
                        src: options.src,
                        alt: options.alt,
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