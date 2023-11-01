import React from 'react';
import '../../index.css';
import App from '../../App';
import SignUp from '../../pages/auth/SignUp';
import Login from '../../pages/auth/Login';
import SocialLogin from '../../pages/auth/SocialLogin';
import CreateWikiDraft from '../../pages/wiki/CreateWikiDraft';
import WikiDrafts from '../../pages/admin/WikiDrafts';
import WikiMain from '../../pages/wiki/WikiMain';
import Articles from '../../pages/article/Articles';
import EditArticles from '../../pages/article/EditArticles';
import Practices from '../../practices/Practices';
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
                    /*<Route path="/wiki/:dynamicPart/article" element={<Articles />} />*/}
                    <Route path="/asdfasdf" element={<Articles />} />
                    <Route path="/edit" element={<EditArticles />} />

                    <Route path="/prac" element={<Practices />} />


                </Routes>
            </BrowserRouter>
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    )
}

export default AppRouter;
