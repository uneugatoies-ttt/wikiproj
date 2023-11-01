import React, { useEffect, useState } from 'react';
import ArticlePage from './ArticlePage';
import { selectArticleByWikinameAndTitle } from '../../services/ApiService';

function Articles() {
    console.log("asdfasdf");
    const path = window.location.pathname;
    const parts = path.split('/');

    //const wikiname = parts[2];
    //const title = parts[parts.length - 1];
    const wikiname = 'wiki002';
    const title = 'main-page';

    const [articleData, setArticleData] = useState(null);

    useEffect(() => {
        selectArticleByWikinameAndTitle(wikiname, title)
            .then((response) => {
                setArticleData(response);
            });
    }, []);

    console.log(articleData);

    if (articleData) {
        return (
            <div>
                <ArticlePage data={articleData} wikiname={wikiname}/>
            </div>
        );
    } else {
        return <div>FETCHING INCOMPLETE</div>;
    }
}

export default Articles;