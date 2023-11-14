import React from 'react';
import { Node, mergeAttributes, CommandProps } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ImageComponent from './ImageComponent';

import ImageFrame1 from '../imgframes/ImageFrame1';

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
                ({ chain }: CommandProps) => {
                    return chain()
                        .insertContent({
                            type: "img",
                            src: "https://images.theconversation.com/files/443350/original/file-20220131-15-1ndq1m6.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C3354%2C2464&q=45&auto=format&w=926&fit=clip",
                            alt: options.alt,
                        })
                        .run();


                }
        };
    },
    




    renderHTML({ HTMLAttributes }) {
        return ["image-renderer", mergeAttributes(HTMLAttributes)];
    },

    
    addNodeView() {
        return ReactNodeViewRenderer(ImageComponent);
    }


});

export default ImageNode;