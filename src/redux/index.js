import { createBrowserHistory } from "history";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducers as authReducers } from "./auth";
import { reducers as usersReducers } from "./users";
import { reducers as messageReducers } from "./messages";
import { reducers as likeReducers} from "./likes"

export * from "./auth";
export * from "./users";
export * from "./messages";
export * from "./likes";

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

export const store = configureStore({  //shapping state 
  reducer: {
    router: connectRouter(history),
    auth: combineReducers(authReducers),
    users: combineReducers(usersReducers),
    messages: combineReducers(messageReducers),
    likes: combineReducers(likeReducers)
  },
  preloadedState: {},
  devTools: process.env.NODE_ENV !== "production"
});

store.subscribe(() => {
  localStorage.setItem("login", JSON.stringify(store.getState().auth.login));
});
