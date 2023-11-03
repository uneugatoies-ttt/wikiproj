import React, { useEffect, useState } from 'react';
import EditPage from './EditPage';
import { selectArticleByWikinameAndTitle } from '../../../services/ApiService';

function EditArticles() {
    const path = window.location.search;
    const params = new URLSearchParams(path);
    const wikiname = params.get("wikiname");
    const title = params.get("title");

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
                <EditPage data={articleData} wikiname={wikiname}/>
            </div>
        );
    } else {
        return <div>FETCHING INCOMPLETE</div>;
    }
}

export default EditArticles;