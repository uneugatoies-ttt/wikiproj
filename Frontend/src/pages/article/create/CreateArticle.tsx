import React from 'react';
import TiptapEditor from '../../../components/text_editor/TiptapEditor';
import { Button } from '@mui/material';
import { insertArticle, ArticleDTO } from '../../../components/services/ApiService';
import { Formik, Field, Form, ErrorMessage, useField, FieldAttributes, useFormik } from 'formik';
import * as Yup from 'yup';
import { Editor } from '@tiptap/react';

/*  NOTE/TODO
    -> Currently I'm giving a function as one of props and 
    making the lower component call it when it is needed,
    but I'm not sure whether this is a reasonable way to do this or not. 

*/


const CreateArticlePractice = () => {
    const [creationFlag, setCreationFlag] = React.useState(false);
    const [editor, setEditor] = React.useState<Editor | null>(null);

    // 'window.location.pathname' will return something like '/wiki/wiki-example/create-new'.
    const wikiname = window.location.pathname.split('/')[2];
    const lastEditor = localStorage.getItem("USERNAME");
    
    const createNewArticle = (contents: string) => {
        const title = 'example article title';
        const contentString = contents;
        const versionMemo = 'creating a new article example'

        if (!lastEditor || !versionMemo) {
            return;
        }

        //console.log(contentString);

        console.log(wikiname);
        
        insertArticle({
            wikiname: wikiname,
            title: title,
            content: contentString,
            lastEditor: lastEditor,
            versionMemo: versionMemo,
        });
    }

    const content = '';

    return (
        <Formik 
            initialValues={{ 
                title: 'Article Default Title',
                wikiname: wikiname,
                content: '',
                lastEditor: lastEditor,
                versionMemo: '',
            }}
            validationSchema={Yup.object({
                title: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
            })}
            onSubmit={( values, { setSubmitting }) => {
                
                setSubmitting(false);
            }}

        >
            <Form>
                <label htmlFor="">Article Title</label>
                <Field name="title" type="text" />
                <ErrorMessage name="title" />

                <TiptapEditor 
                    content={content} 
                    creationFlag={creationFlag}
                    createNewArticle={createNewArticle}
                />
                
                <Button
                    type="submit"
                >
                    CONFIRM
                </Button>
            </Form>
        </Formik>
    );
}

export default CreateArticlePractice;