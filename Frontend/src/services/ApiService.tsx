import { API_BASE_URL } from '../config/api-config';

export async function call(api: string, method: string, request: { [key: string]: any } | null) {
    try {
        const headers = new Headers({'Content-Type': 'application/json'});

        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (accessToken && accessToken !== null) {
            headers.append("Authorization", "Bearer " + accessToken);
        }

        const options = {
            headers: headers,
            method: method,
            ...(method !== 'GET' && { body: JSON.stringify(request) }),
        };
        
        const result = await fetch(API_BASE_URL + api, options);

        // 'result.ok' includes not only 200, but also other successful status codes like 201.
        // but do we really have to call .json()?
        if (result.ok) {
            return result.json();
        } else if (result.status === 403) {
            // Unauthorized access
            window.location.href = '/login';
        } else {
            const errorMessage = await result.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error with using fetch()', error);
        throw error;
    }
};

// USER AUTH/REGI RELATED BEGINS
export interface UserDTO {
    username: string,
    password: string,
    email?: string,
    token?: string,
    id?: number,
}

export async function signin(userDTO: UserDTO) {
    try {
        const response = await call('/auth/signin', 'GET', userDTO);
        response.then((result: UserDTO) => {
            if (result.id && result.token && result.username) {
                localStorage.setItem("ACCESS_TOKEN", result.token);
                localStorage.setItem("USERNAME", result.username);
                window.location.href = '/';
            }
        })
    } catch (error) {
        console.error('Error with using signin()', error);
        throw error;
    }
}

// Delete the existing token from a user's local storage 
export function signout() {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USERNAME");
    window.location.href = '/login';
}

export async function signup(userDTO: UserDTO) {
    try {
        const response = await call("/auth/regi", "POST", userDTO);
        response.then((result: UserDTO) => {
            if (result.id && result.username) {
                window.location.href = '/login';
            }
        });
    } catch (error) {
        console.error('Error with using signup()', error);
        throw error;
    }
}

/*
    -> The reason why you should give the parameter "redirect_url"
    with this application's URL is because at the end of the OAuth flow of the backend,
    a user should be redirected to a frontend page.
    But since, as of now, the redirection URI is always the same and never changes;
    therefore I modified the code to not give the parameter to the backend.
    If any change is made in the future, corresponding handling should be made.

    -> That change is indeed made.

    -> Remember the difference between this function and other API authentication functions;
    this doesn't call fetch() to send a request to the backend server, but this simply
    redirect your location to the OAuth authorization end point, that was set in the
    backend configuration. 
*/
export function socialLogin(provider: string) {
    const frontend_url = window.location.protocol + "//" + window.location.host;
    window.location.href = API_BASE_URL + "/auth/authorize/"  + provider + "?redirect_uri=" + frontend_url;
}
// USER AUTH/REGI RELATED ENDS

// WIKI RELATED BEGINS
export interface WikiAndWikiDraftDTO {
    wikiname: string,
    description: string,
    wikiClassName: string,
    proponent?: string,
    wikiCandidateId?: number,
    wikiId?: number,
}

/*
    -> The deletion of a corresponding wiki draft should be done as soon as
    the creation of a wiki is finished; but where should I perform it?
    In this 'createWiki'? Or in the component 'WikiDrafts'?
    As of now, I will choose the latter; if there will ever be a certain
    'revelation' on where I should define it, then I'll change the flow.
*/
export async function createWiki(wikiDTO: WikiAndWikiDraftDTO) {
    try {
        const response = await call('/wiki/create', 'POST', wikiDTO);
        response.then((result: WikiAndWikiDraftDTO) => {
            if (result.wikiId) {
                // What should I write at this?
            }
        })
    } catch(error) {
        console.error('Error with using createWiki()', error);
        throw error;
    }
}
// WIKI RELATED ENDS

// WIKI DRAFT RELATED BEGINS
export async function createWikiDraft(wikiDraftDTO: WikiAndWikiDraftDTO) {
    try {
        const response = await call('/wiki/draft', 'POST', wikiDraftDTO);
        response.then((result: WikiAndWikiDraftDTO) => {
            if (result.wikiCandidateId) {
                // What should I write at this?
            }
        });
    } catch (error) {
        console.error('Error with using createWikiDraft():', error);
        throw error;
    }
}

export async function fetchWikiDrafts() {
    try {
        const response = await call('/wiki/draft', 'GET', null);
        response.then((result: WikiAndWikiDraftDTO[]) => {
            return result;
        })
    } catch (error) {
        console.error('Error with using fetchWikiDrafts():', error);
        throw error;
    }
}

export async function deleteWikiDraft(id: number) {
    try {
        const response = await call('/wiki/draft', 'DELETE', { id });
        response.then((result: { data: string }[]) => {
            if (result[0] && result[0].data === 'Deletion Complete') {
                console.log(result[0].data);
            }
        })
    } catch (error) {
        console.error('Error with using deleteWikiDraft():', error);
        throw error;
    }
}
// WIKI DRAFT RELATED ENDS

// ARTICLE RELATED BEGINS
export interface ArticleDTO {
    wikiname: string,
    title: string,
    content: string,
    articleId?: number,
    lastEditor?: string,
    categories?: string[],
    tags?: string[],
    versionMemo?: string,
}

export async function selectArticleByWikinameAndTitle(wikiname: string, title: string) {
    try {
        const response = await call('/article/select-by-wt?wikiname=' + wikiname + '&title=' + title, 'GET', null);
        response.then((result: ArticleDTO) => {
            if (result.articleId) {
                return result;
            }
        });
    } catch (error) {
        console.error('Error with using selectArticleByWikinameAndArticle():', error);
        throw error;
    }
}

export async function insertArticle(articleDTO: ArticleDTO) {
    try {
        const response = await call('/article', 'POST', articleDTO);
        response.then((result: ArticleDTO) => {
            if (result.articleId) {
                console.log(result);
            }
        });
    } catch (error) {
        console.error('Error with using insertArticle():', error);
        throw error;
    }
}

export async function editArticle(articleDTO: ArticleDTO) {
    try {
        const response = await call('/article', 'PUT', articleDTO);
        response.then((result: ArticleDTO) => {
            if (result.articleId) {
                console.log(result);
            }
        });
    } catch (error) {
        console.error('Error with using editArticle():', error);
        throw error;    
    }
}
// ARTICLE RELATED ENDS

// IMAGE HANDLING RELATED BEGINS
export async function insertImage() {
    try {

    } catch (error) {
        console.error('')
    }
}

export async function fetchImage(imagePath: string) {
    try {
        const response = await fetch(API_BASE_URL + '/image/' + imagePath);
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

