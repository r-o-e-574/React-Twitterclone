import {
    domain,
    jsonHeaders,
    handleJsonResponse,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer,
    getInitStateFromStorage
} from "./helpers";


const url = domain + "/messages";

const GETMESSAGES = createActions("getMessage");
export const getMessages = () => dispatch => {
    dispatch(GETMESSAGES.START());

    return fetch(url, {
        method: "GET",
        headers: jsonHeaders,
    })
        .then(handleJsonResponse)
        .then(result => dispatch(GETMESSAGES.SUCCESS(result)))
        .catch(err => Promise.reject(dispatch(GETMESSAGES.FAIL(err))));
};

const CREATEMESSAGE = createActions("createMessage");
export const createMessage = newMessageData => (dispatch, getState) => {
    dispatch(CREATEMESSAGE.START());

    const token = getState().auth.login.result.token;
    const messageData = { text: newMessageData }

    return fetch(url, {
        method: "POST",
        headers: { Authorization: "Bearer " + token, ...jsonHeaders },
        body: JSON.stringify(messageData)
    })
        .then(handleJsonResponse)
        .then(result => {
            dispatch(CREATEMESSAGE.SUCCESS(result))
            dispatch(getMessages())
            dispatch(userMessages())
        })
        .catch(err => Promise.reject(dispatch(CREATEMESSAGE.FAIL(err))));
};

const DELETEMESSAGE = createActions("deleteMessage");
export const deleteMessage = (messageId, userName) => (dispatch, getState) => {
    dispatch(DELETEMESSAGE.START());

    const token = getState().auth.login.result.token;
    console.log(userName);
    let username = "";
    if (userName.username === ":username" || userName === undefined || userName === null) {
        username = getState().auth.login.result.username;
    } else if (typeof userName === "string") {
        username = userName;
    } else {
        username = userName.username.slice(1);
    }
    console.log(username);

    console.log(messageId);
    return fetch(url + `/${messageId}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token, ...jsonHeaders }
    })
        .then(handleJsonResponse)
        .then(result => {
            dispatch(DELETEMESSAGE.SUCCESS(result))
            dispatch(getMessages())
            dispatch(userMessages(username))
        })
        .catch(err => Promise.reject(dispatch(DELETEMESSAGE.FAIL(err))));
};

const USERMESSAGES = createActions("usermessages");
export const userMessages = userName => (dispatch, getState) => {
    dispatch(USERMESSAGES.START());

    console.log(userName);
    let username = "";
    if (typeof userName === "string" && userName !== "username") {
        username = userName;
    } else if (typeof userName === "object") {
        if (userName.username === ":username" || userName.username === undefined || userName === null) {
            username = getState().auth.login.result.username;
        } else {
            username = userName.username.slice(1);
        }
    } else {
        username = getState().auth.login.result.username;
    }
    console.log(username);

    return fetch(url + `?username=${username}`, {
        method: "GET",
        headers: jsonHeaders,
    })
        .then(handleJsonResponse)
        .then(result => dispatch(USERMESSAGES.SUCCESS(result)))
        .catch(err => Promise.reject(dispatch(USERMESSAGES.FAIL(err))));
};


export const reducers = {
    getMessages: createReducer(asyncInitialState, {
        ...asyncCases(GETMESSAGES)
    }),
    createMessage: createReducer(asyncInitialState, {
        ...asyncCases(CREATEMESSAGE)
    }),
    deleteMessage: createReducer(getInitStateFromStorage("deleteMessage", asyncInitialState), {
        ...asyncCases(DELETEMESSAGE)
    }),
    userMessages: createReducer(asyncInitialState, {
        ...asyncCases(USERMESSAGES) //setting up switch statement 
    })
};
