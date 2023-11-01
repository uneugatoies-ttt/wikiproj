import React from 'react';
import TiptapEditor from '../../components/text_editor/tiptap/TiptapEditor';

const EditPage = ({ data, wikiname }) => {
    if (!data) {
        console.log("problem with data: " + data);
        return null;
    }
    if (!data.content) {
        console.log("problem with data.content: " + data.content);
        return null;
    }

    const content = JSON.parse(data.content);


    return (
        <TiptapEditor content={content} />
    );
}

export default EditPage;