import {
  domain,
  jsonHeaders,
  handleJsonResponse,
  getInitStateFromStorage,
  asyncInitialState,
  asyncCases,
  createActions,
  createReducer
} from "./helpers";

const url = domain + "/auth";

const LOGIN = createActions("login"); //creating action creators
export const login = loginData => dispatch => { //making actual api calls
  dispatch(LOGIN.START());

  return fetch(url + "/login", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(loginData)
  })
    .then(handleJsonResponse)
    .then(result => dispatch(LOGIN.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(LOGIN.FAIL(err))));
};

const LOGOUT = createActions("logout");
export const logout = () => (dispatch, getState) => {
  dispatch(LOGOUT.START());

  const token = getState().auth.login.result.token; //needed for any endpoint that needs to be login to work with 

  return fetch(url + "/logout", {
    method: "GET",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders } //needed for any endpoint that needs to be login to work with
  })
    .then(handleJsonResponse)
    .then(result => dispatch(LOGOUT.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(LOGOUT.FAIL(err))));
};

export const reducers = {
  login: createReducer(getInitStateFromStorage("login", asyncInitialState), {
    ...asyncCases(LOGIN),
    [LOGOUT.SUCCESS.toString()]: (state, action) => asyncInitialState
  }),
  logout: createReducer(asyncInitialState, {
    ...asyncCases(LOGOUT)
  })
};
