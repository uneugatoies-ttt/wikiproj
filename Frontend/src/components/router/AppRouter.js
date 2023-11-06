import React from 'react';
import '../../index.css';
import App from '../../App';

import SignUp from '../../pages/auth/SignUp';
import Login from '../../pages/auth/Login';
import SocialLogin from '../../pages/auth/SocialLogin';

import CreateWikiDraft from '../../pages/wiki/CreateWikiDraft';
import WikiDrafts from '../../pages/admin/WikiDrafts';
import WikiMain from '../../pages/wiki/WikiMain';

import Articles from '../../pages/article/display/Articles';
import EditArticles from '../../pages/article/edit/EditArticles';
import CreateArticle from '../../pages/article/create/CreateArticle';

import ArticleParsingPrac from '../../practices/ArticleParsingPrac';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

function Copyright() {
    return (
        <div>
            <Typography variant="body2" color="textSecondary" align="center">
                {"NOT Copyrighted @ "}
                Uneugatoies, {new Date().getFullYear()}
                {"."}
            </Typography>
        </div>
    )
};

/*
    > ':dynamicPart' should be the wiki's name.
*/



function AppRouter() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sociallogin" element={<SocialLogin />} />

                    <Route path="/create-draft" element={<CreateWikiDraft />} />
                    <Route path="/adm/wiki-drafts" element={<WikiDrafts />} />
                    
                    <Route path="/wiki" element={<WikiMain />} />
                    
                    {// problem with dynamic routing.
                    /*<Route path="/:dynamicPart" element={<Articles />} />*/}
                    <Route path="/edit" element={<EditArticles />} />
                    <Route path="/create" element={<CreateArticle />} />
                    <Route path="/asdfasdf" element={<Articles />} />

                    <Route path="/prac" element={<ArticleParsingPrac />} />


                </Routes>
            </BrowserRouter>
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    )
}

export default AppRouter;
