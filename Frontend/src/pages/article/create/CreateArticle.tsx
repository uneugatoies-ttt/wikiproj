import React from 'react';
import TiptapEditor from '../../../components/text_editor/TiptapEditor';
import { Button } from '@mui/material';
import { insertArticle, ArticleDTO } from '../../../components/services/ApiService';
//import { Formik, Field, Form, ErrorMessage, useField, FieldAttributes, useFormik } from 'formik';
//import * as Yup from 'yup';
import { useCurrentEditor, useEditor } from '@tiptap/react';

/*  NOTE/TODO
    -> Currently I'm giving a function as one of props and 
    making the lower component call it when it is needed,
    but I'm not sure whether this is a reasonable way to do this or not. 

*/


const CreateArticle = () => {
    const [creationFlag, setCreationFlag] = React.useState(false);

    // 'window.location.pathname' will return something like '/wiki/wiki-example/create-new'.
    const wikiname = window.location.pathname.split('/')[2];
    const lastEditor = localStorage.getItem("USERNAME");
    
    const createNewArticle = (content: string) => {
        const title = (document.getElementById('title') as HTMLInputElement)?.value;
        const contentString = content;
        const versionMemo = 'Creating a new article';

        if (!lastEditor || !versionMemo) {
            return;
        }

        //console.log(title);
        console.log(contentString);
        //console.log(wikiname);
        
        
        /*insertArticle({
            wikiname: wikiname,
            title: title,
            content: contentString,
            lastEditor: lastEditor,
            versionMemo: versionMemo,
        })
            .then((r) => {
                window.location.href = '/wiki/' + wikiname.replace(' ', '-') + '/' + title;
            });*/
    }

    const content = '';


    return (
        <form> 
            <label htmlFor="">Article Title</label>
            <input name="title" id="title" type="text"/>
            <TiptapEditor
                content={content}
                flag={creationFlag}
                calledWhenFlagIsTrue={createNewArticle}
            /> 
            <Button 
                onClick={() => {
                    setCreationFlag(true);
                }
            }>
                CONFIRM
            </Button>
        </form>
    );
}

export default CreateArticle;