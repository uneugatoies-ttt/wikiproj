import React from 'react';
import { Navigate } from 'react-router-dom';

const SocialLogin = (props) => {
    // this function is used to parse the token from the given parameter of URL. 
    const getUrlParameter = (name) => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        return params.get(name);
    };

    const token = getUrlParameter("token");
    const username = getUrlParameter("username");

    console.log("token parsing: " + token);
    console.log("username parsing: " + username);

    if (token && username) {
        console.log("storing the token in the local storage " + token);
        console.log("storing the username in the local storage " + username);
        localStorage.setItem("ACCESS_TOKEN", token);
        localStorage.setItem("USERNAME", username);
        return (
            <Navigate
                to={{
                    pathname: "/",
                    state: { from: props.location },
                }}
            />
        );
    } else {
        return (
            <Navigate
                to={{
                    pathname: "/login",
                    state: { from: props.location },
                }}
            />
        );
    }
}

export default SocialLogin;