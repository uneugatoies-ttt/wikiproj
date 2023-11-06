import React from 'react';
import TiptapEditor from '../components/text_editor/tiptap/TiptapEditor';
import { selectArticleByWikinameAndTitle } from '../services/ApiService';

/* NOTE
    -> When using rendering the article, why the whole thing doesn't work
    if I don't use if statement that checks whether 'content' is null or not?
*/


const ArticleParsingPrac = () => {
    const [content, setContent] = React.useState(null);

    React.useEffect(() => {
        selectArticleByWikinameAndTitle('Wiki Example', 'example article title')
            .then((res) => {
                setContent(JSON.parse(res.content));
            });
    }, [])

    const creationFlag = false;
    const createNewArticle = null;
    
    if (content) {
        return (
            <div>
                <TiptapEditor 
                    content={content} 
                    creationFlag={creationFlag}
                    createNewArticle={createNewArticle}
                />
            </div>
        );
    } else {
        return <div>FETCHING INCOMPLETE</div>;
    }
    
}

export default ArticleParsingPrac;