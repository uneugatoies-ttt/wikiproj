import React from 'react';
import TiptapEditor from '../../../components/text_editor/TiptapEditor';

function EditArticles(props: { articleData: string }) {
    const data = props.articleData;
    if (!data) {
        console.log("problem with data: " + data);
        return null;
    }

    return (
        <TiptapEditor 
            content={data} 
            flag={false}
            calledWhenFlagIsTrue={(c: string) => {}} 
        />
    );
}

export default EditArticles;