import React from 'react';
import { Navigate } from 'react-router-dom';

/*  NOTE/TODO
    -> Note that this component is for the end point of the OAuth authentication;
    after the process in the backend is over, the logic is redirected to this component
    with 'token' and 'username' as parameters in the URL.
    If those two are present, then this component parses two values and stores them
    into the localStorage of the user's browser.

    -> So, don't be puzzled by the fact that this component is not using the 'socialLogin()'
    from the APIs of 'ApiService'.
*/

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