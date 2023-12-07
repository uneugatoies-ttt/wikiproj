import { API_BASE_URL } from '../../config/api-config';

import axios from 'axios';

/* NOTE/TODO
    -> 'response'를 await로 받고 거기서 then()을 call하는 대신 다음 코드를 사용 가능하다:
    const result: ArticleDTO = await call('/article', 'PUT', articleDTO);
    if (result.articleId) {
        console.log(result);
    }
    IWAAIL.

    -> .then()과 .catch()는 비동기 연산이 모두 종료되어 'fulfilled'나 'rejected'의
    상태가 된 시점을 나타낸다. 'await' 또한 비동기 연산이 모두 종료되는 시점을 처리한다.
    그러므로 'await'을 사용해서 call한 function의 return value에서 다시 .then이나
    .catch를 call하는 것은 완전히 무의미하며, 이것은 오류를 발생시킨다는 것을 명심하도록 한다.
*/

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
        const result = await call('/auth/signin', 'POST', userDTO);

        if (result.id && result.token && result.username) {
            localStorage.setItem("ACCESS_TOKEN", result.token);
            localStorage.setItem("USERNAME", result.username);
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error with using signin()', error);
        throw error;
    }
}

// Delete the existing token from a user's local storage 
export function signout() {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USERNAME");
    //window.location.href = '/login';
}

export async function signup(userDTO: UserDTO) {
    try {
        const result = await call("/auth/regi", "POST", userDTO);

        if (result.id && result.username) {
            window.location.href = '/login';
        }
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
        const result = await call('/wiki/draft', 'POST', wikiDraftDTO);

        if (result.wikiCandidateId) {
            // What should I write?
        }
    } catch (error) {
        console.error('Error with using createWikiDraft():', error);
        throw error;
    }
}

export async function fetchWikiDrafts() {
    try {
        const result = await call('/wiki/draft', 'GET', null);
        return result;
    } catch (error) {
        console.error('Error with using fetchWikiDrafts():', error);
        throw error;
    }
}

export async function deleteWikiDraft(id: number) {
    try {
        const result = await call('/wiki/draft', 'DELETE', { id });
        if (result[0] && result[0].data === 'Deletion Complete') {
            console.log(result[0].data);
        }
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
    lastEditor?: string | null,
    categories?: string[],
    tags?: string[],
    versionMemo?: string,
}

export async function selectArticleByWikinameAndTitle(wikiname: string, title: string) {
    try {
        const result = await call('/article/select-by-wt?wikiname=' + wikiname + '&title=' + title, 'GET', null);
        
        if (result.articleId) {
            return result;
        }
    } catch (error) {
        console.error('Error with using selectArticleByWikinameAndArticle():', error);
        throw error;
    }
}

export async function insertArticle(articleDTO: ArticleDTO) {
    try {
        const result = await call('/article', 'POST', articleDTO);
        
        if (result.articleId) {
            return result;
        }
    } catch (error) {
        console.error('Error with using insertArticle():', error);
        throw error;
    }
}

export async function editArticle(articleDTO: ArticleDTO) {
    try {
        const result = await call('/article', 'PUT', articleDTO);
        if (result.articleId) {
            console.log(result);
        }
    } catch (error) {
        console.error('Error with using editArticle():', error);
        throw error;    
    }
}
// ARTICLE RELATED ENDS

// FILE HANDLING RELATED BEGINS
export interface FileDTO {
    fileName: string,
    uploader: string,
    fileType: string,
    description?: string
    createdAt?: Date,
    id?: number,
    usedInThisWiki?: string,
}

export async function insertImage(formData: FormData) {
    try {
        const response = await axios.post(API_BASE_URL + '/file', formData);
        if (!response || response.status.toString()[0] !== '2') {
            throw new Error(`Image request failed with status: ${response.status}`);
        }
        console.log('File uploaded successfully', response);
        return response;
    } catch (error) {
        console.error('Error uploading file', error);
    }
}

export async function fetchImage(fileName: string, wikiName: string) {
    try {
        const response = await fetch(API_BASE_URL + `/file?fileName=${encodeURIComponent(fileName)}&wikiName=${encodeURIComponent(wikiName)}`, { method: 'GET' });
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

export async function isFileNamePresent(fileName: string, wikiName: string): Promise<boolean> {
    try {
        const response = await fetch(API_BASE_URL + `/file/presence?fileName=${encodeURIComponent(fileName)}&wikiName=${encodeURIComponent(wikiName)}`, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Image request failed with status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error with using isFileNamePresent(): ', error);
        throw error;
    }
}
// FILE HANDLING RELATED ENDS

// NOTIFICATION MESSAGE RELATED BEGINS
export interface NotificationMessageDTO {
    message: string,
    recipient: string,
    where: string,
    id?: number,
    wiki?: string,
}

export async function getAllMessagesForThisUser() {
    try {
        const userName = localStorage.getItem("USERNAME");
        const result = await call('/noti/user-messages?username=' + userName, 'GET', null);
        return result;
    } catch (error) {
        console.error('Error with using getAllMessagesForThisUser(): ', error);
        throw error;
    }
}
// NOTIFICATION MESSAGE RELATED ENDS