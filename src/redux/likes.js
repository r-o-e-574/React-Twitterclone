import {
    domain,
    jsonHeaders,
    handleJsonResponse,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer
} from "./helpers";

import { getMessages, userMessages } from "./messages"

const url = domain + "/likes";

const TOGGLELIKE = createActions("createMessage");
export const toggleLike = (messageId, location, userName) => (dispatch, getState) => {

    console.log(userName);
    let username = "";
    if (typeof userName === "string") {
        username = userName;
    } else if (typeof userName === "object") {
        if (userName.username === ":username" || userName.username === undefined || userName === null) {
            username = getState().auth.login.result.username;
        } else {
            username = userName.username.slice(1);
        }
    }
    console.log(username);

    const user = getState().auth.login.result.username;

    let messages = [];
    if (location === "messagefeed") {
        messages = getState().messages.getMessages.result.messages;
    } else {
        messages = getState().messages.userMessages.result.messages;
    }
    const message = messages.find(message => message.id === messageId);

    console.log(username)
    console.log(messages)
    console.log("Looking for this")
    console.log(messageId)
    console.log("Message found")
    console.log(message)

    const likes = message.likes;
    const likeUsernames = likes.map(like => like.username);

    console.log(likes)
    console.log(likeUsernames)

    if (likes.length > 0) {
        for (let i = 0; i < likeUsernames.length; i++) {
            if (likeUsernames[i] === user) {
                return dispatch(removeLike(likes[i].id, location, username));
            }
        }
        return dispatch(addLike(messageId, location, username));
    } else {
        return dispatch(addLike(messageId, location, username));

    }
};

const ADDLIKE = createActions("addlike");
export const addLike = (MessageId, location, userName) => (dispatch, getState) => {
    dispatch(ADDLIKE.START());

    const token = getState().auth.login.result.token;
    const responsebody = { messageId: MessageId };

    return fetch(url, {
        method: "POST",
        headers: { Authorization: "Bearer " + token, ...jsonHeaders },
        body: JSON.stringify(responsebody)
    })
        .then(handleJsonResponse)
        .then(result => {
            console.log("added")
            dispatch(ADDLIKE.SUCCESS(result))
            if (location === "messagefeed") {
                dispatch(getMessages())
            } else {
                dispatch(userMessages(userName))
            }
        })
        .catch(err => Promise.reject(dispatch(ADDLIKE.FAIL(err))));
};


const REMOVELIKE = createActions("removelike");
export const removeLike = (likeId, location, userName) => (dispatch, getState) => {
    dispatch(REMOVELIKE.START());

    const token = getState().auth.login.result.token;

    return fetch(url + `/${likeId}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token, ...jsonHeaders }
    })
        .then(handleJsonResponse)
        .then(result => {
            console.log("removed")
            dispatch(REMOVELIKE.SUCCESS(result))
            if (location === "messagefeed") {
                dispatch(getMessages())
            } else {
                dispatch(userMessages(userName))
            }
        })
        .catch(err => Promise.reject(dispatch(REMOVELIKE.FAIL(err))));
};



export const reducers = {
    addLike: createReducer(asyncInitialState, {
        ...asyncCases(ADDLIKE)
    }),
    removeLike: createReducer(asyncInitialState, {
        ...asyncCases(REMOVELIKE)
    }),
    toggleLike: createReducer(asyncInitialState, {
        ...asyncCases(TOGGLELIKE)
    })
}
