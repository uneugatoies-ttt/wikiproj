import React from 'react';
import Articles from './display/Articles';
import CreateArticles from './create/CreateArticle';
import EditArticles from './edit/EditArticles';

function ArticleTopmost() {
    const [action, setAction] = React.useState(null);

    let search = window.location.search;
    let params = new URLSearchParams(search);

    React.useEffect(() => {
        if (!params.get('action')) {
            setAction('display');
        } else {
            setAction(params.get('action'));
        }
    }, [])

    if (action === 'display') {
        return (
            <div>
                <Articles />
            </div>
        );    
    } else if (action === 'edit') {
        return (
            <div>
                <EditArticles />
            </div>
        );    
    } else if (action === 'create') {
        return (
            <div>
                <CreateArticles />
            </div>
        );    
    } else {
        return (
            <div>
                ACTION UNRECOGNIZED
            </div>
        );
    } 
}

export default ArticleTopmost;