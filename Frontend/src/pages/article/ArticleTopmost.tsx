import React from 'react';
import Articles from './display/Articles';
import EditArticles from './edit/EditArticles';
import { ArticleDTO, selectArticleByWikinameAndTitle } from '../../services/ApiService';
import { useParams } from 'react-router-dom';

/* NOTE/TODO
    -> In this topmost component, the 'CreateArticle' will not be managed;
    for it doesn't need to fetch an existing article, unlike the cases of 
    EditArticles and Articles.
*/


function ArticleTopmost() {
    const [action, setAction] = React.useState('display');
    const [articleData, setArticleData] = React.useState<string>('');
    const [loading, setLoading] = React.useState(true);

    const { wikiname, arti } = useParams();

    React.useEffect(() => {
        const search = window.location.search;
        const urlParams = new URLSearchParams(search);
        const actionParam = urlParams.get('action');
        if (actionParam) {
            setAction(actionParam);
        }
        if (wikiname && arti) {
            selectArticleByWikinameAndTitle(wikiname, arti)
                // @ts-ignore
                .then((result: ArticleDTO) => {
                    setArticleData(result.content);
                    setLoading(false);
                });
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!articleData) {
        return <div>Article Not Found</div>
    }

    if (action === 'display') {
        return <Articles articleData={articleData} />;
    } else if (action === 'edit') {
        return <EditArticles articleData={articleData} />;
    } else {
        return <div>ACTION UNRECOGNIZED</div>;
    }
}

export default ArticleTopmost;