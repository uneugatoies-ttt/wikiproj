import React from 'react';
import { useCurrentEditor } from '@tiptap/react';

const DisplayArticle = (prop) => {
    const { editor } = useCurrentEditor();
    if (!editor) {
        return null;
    }

    prop.displayArticle(editor.getHTML());
}

export default DisplayArticle;