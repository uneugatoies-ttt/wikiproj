import React from 'react';

import Main from '../../pages/main/Main';

import SignUp from '../../pages/auth/SignUp';
import Login from '../../pages/auth/Login';
import SocialLogin from '../../pages/auth/SocialLogin';

import AdminTopmost from '../../pages/admin/AdminTopmost';
import ArticleTopmost from '../../pages/article/ArticleTopmost';
import CreateArticle from '../../pages/article/create/CreateArticle';
import WikidraftTopmost from '../../pages/wiki/WikidraftTopmost';
import ManageTopmost from '../../pages/manage/ManageTopmost';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Typography,
  Box,
} from "@mui/material";


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
    -> About dynamic routing: https://reactrouter.com/en/main/route/route

    -> I would continue building the app with routing that works as follows:
        -> One <Route> is only assigned to the top-most component of a group of components,
        which are encompassed by their certain functionalities such as handling articles.

        -> In the routed top-most component, further rendering change will be beckoned 
        by a URL's parameter.
        For example, when editing is being done on an article, the user should be redirected to 
        the same URL but with the parameter like '?action=edit'
        And similar behaviors should be implemented to those actions other than editing.
*/

function AppRouter() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
    
                    {/*These should be consolidated into <AuthTopmost> in the later time*/}
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sociallogin" element={<SocialLogin />} />
    
                    <Route
                        path="/wikidraft"
                        element={<WikidraftTopmost />}
                    />
                    
                    <Route
                        path="/adm"
                        element={<AdminTopmost />}
                    />
    
                    <Route
                        path="/wiki/:wikiname/create-new"
                        element={<CreateArticle /> }
                    />
                    
                    <Route 
                        path="/wiki/:wikiname/:arti"
                        element={<ArticleTopmost />}
                    />
    
                    <Route 
                        path="/wiki/:wikiname/manage"
                        element={<ManageTopmost />}
                    />
                </Routes>
            </BrowserRouter>
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    );
}

export default AppRouter;
