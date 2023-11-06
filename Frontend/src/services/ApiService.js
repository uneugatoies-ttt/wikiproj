import { API_BASE_URL } from '../config/api-config.js';



/*  TODO
    > Currently managing the API request/response is not very succinct,
    and it's pretty hard to get the point from the code.
    Should review and modify the code; especially eliminate all meaningless parts.

    > Plus, overall learning of asynchronous programming should be continued;
    this time the knowledge should be almost complete - along with the use
    of 'async/await'.

    > And the style of writing logic with callbacks should be more fluent;
    although this doesn't have to be heavily focused, the inconvenience must be obliterated.

*/


// using promises
export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    })

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    // why do you have to use 'accessToken !== null' when its nullity was already checked
    // in 'if (accessToken)' ? 
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    }

    if (request) {
        // GET method
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 403) {
            window.location.href = "/login";
        } else {
            return response.text().then((errorMessage) => {
                throw new Error(errorMessage);
            });
        }
    }).catch((error) => {
        console.log("error with using fetch()");
        console.log(error);
        throw error;
    });

};




// USER AUTH/REGI RELATED BEGINS
export function signin(userDTO) {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken) {
        headers.append("Authorization", "Bearer " + accessToken);
    }    

    const options = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(userDTO),
    }

    const url = API_BASE_URL + '/auth/signin';

    return fetch(url, options)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) {
                return 'user not found';
            }
        });
}

// delete the existing token from a user's local storage 
export function signout() {
    localStorage.setItem("ACCESS_TOKEN", null);
    localStorage.setItem("USERNAME", null);
    window.location.href = '/login';
}

export function signup(userDTO) {
    return call("/auth/regi", "POST", userDTO);
}

/*
    - The reason why you should give the parameter "redirect_url"
    with this application's URL is because at the end of the OAuth flow of the backend,
    a user should be redirected to a frontend page.
    But since, as of now, the redirection URI is always the same and never changes;
    therefore I modified the code to not give the parameter to the backend.
    If any change is made in the future, corresponding handling should be made.

    - That change is indeed made.
*/
export function socialLogin(provider) {
    //window.location.href = API_BASE_URL + "/auth/authorize/" + provider;

    const frontend_url = window.location.protocol + "//" + window.location.host;
    window.location.href = 
        API_BASE_URL        +
        "/auth/authorize/"  +
        provider            +
        "?redirect_uri="    +
        frontend_url;
}
// USER AUTH/REGI RELATED ENDS












// WIKI RELATED BEGINS
export function createWiki(wikiDTO) {
    return call("/wiki/create", "POST", wikiDTO);
}

// WIKI RELATED ENDS












// ARTICLE RELATED BEGINS

// I should suspend using the 'async/awiat' functionality until
// I perfectly understand how it works and how I should use it. 
/*
export async function selectArticleByWikinameAndTitle(wikiname, title) {
    try {
        const response = await callAsync('/article/select-by-wt', "GET", {wikiname: wikiname, title: title});
        if (!response.ok) {
            throw new Error(`Article request failed with status: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}
*/

export function selectArticleByWikinameAndTitle(wikiname, title) {
    return call('/article/select-by-wt?wikiname=' + wikiname + '&title=' + title, 'GET', null);
}

export function insertArticle(articleDTO) {
    return call('/article/insert', 'POST', articleDTO);
}
// ARTICLE RELATED ENDS
















// IMAGE HANDLING RELATED BEGINS
export async function imageFetch(imagePath) {
    try {
        const response = await fetch(API_BASE_URL + '/images/' + imagePath);
        if (!response.ok) {
            throw new Error(`Image request failed with status: ${response.status}`);
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error fetching image:', error);
        return null;
    }
}
// IMAGE HANDLING RELATED ENDS

