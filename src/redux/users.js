import {
  domain,
  jsonHeaders,
  handleJsonResponse,
  asyncInitialState,
  asyncCases,
  createActions,
  createReducer
} from "./helpers";
import { login, logout } from "./auth"

const url = domain + "/users";

const SIGNUP = createActions("signup");
export const signup = signupData => dispatch => {
  dispatch(SIGNUP.START());
  
  console.log(signupData);
  const logInData = {
    username:signupData.username, 
    password:signupData.password
  }
  const upDateData = {
    password:signupData.password, 
    about:"Hello, I am new Wispee!",
    displayName: signupData.displayName
  }
  

  return fetch(url, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(signupData)
  })
    .then(handleJsonResponse)
    .then(result => {
      dispatch(SIGNUP.SUCCESS(result))
      dispatch(login(logInData)).then(()=>dispatch(updateuser(upDateData)))
    })
    .catch(err => Promise.reject(dispatch(SIGNUP.FAIL(err))));
};

const DELETEUSER = createActions("deleteuser");
export const deleteuser = () => (dispatch, getState) => {
  dispatch(DELETEUSER.START());
  dispatch(logout());

  const token = getState().auth.login.result.token; //needed for any endpoint that needs to be login to work with 
  const username = getState().auth.login.result.username; //grabs current username from state

  return fetch(url + `/${username}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders } //needed for any endpoint that needs to be login to work with
  })
    .then(handleJsonResponse)
    .then(result => { dispatch(DELETEUSER.SUCCESS(result)) })
    .catch(err => Promise.reject(dispatch(DELETEUSER.FAIL(err))));
};

const UPDATEUSER = createActions("updateuser");
export const updateuser = updateData => (dispatch, getState) => {
  dispatch(UPDATEUSER.START());

  const token = getState().auth.login.result.token; //needed for any endpoint that needs to be login to work with 
  const username = getState().auth.login.result.username; //grabs current username from state

  if(updateData.password === "" || updateData.password === null){
    updateData.password = getState().auth.login.result.password;
  }
  if(updateData.displayName === "" || updateData.displayName === null){
    updateData.displayName = getState().auth.login.result.displayName;
  }
  if(updateData.about === "" || updateData.about === null){
    updateData.about = "Hello, I'm a new wisper user.";
  }
  
  console.log(updateData)
  console.log(updateData.password)
  console.log(updateData.about)
  console.log(updateData.displayName)

  return fetch(url + `/${username}`, {
    method: "PATCH",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders },
    body: JSON.stringify(updateData)
  })
    .then(handleJsonResponse)
    .then(result => {
      dispatch(UPDATEUSER.SUCCESS(result))
      //dispatch(getuser(username))
    })
    .catch(err => Promise.reject(dispatch(UPDATEUSER.FAIL(err))));
};

const UPDATEAVI = createActions("updateavi");
export const updateavi = updateAvi => (dispatch, getState) => {
  dispatch(UPDATEAVI.START());

  const username = getState().auth.login.result.username; //grabs current username from state
  const result = {
    avatar:{
      username: username,
      topType: updateAvi.topType,
      accessoriesType:updateAvi.accessories,
      hairColor:updateAvi.hairColor,
      facialHairType:updateAvi.facialHair,
      clotheType:updateAvi.clotheType,
      clotheColor:updateAvi.clotheColor,
      graphicType:updateAvi.graphicType,
      eyeType:updateAvi.eyeType,
      eyebrowType:updateAvi.eyebrowType,
      mouthType:updateAvi.mouthType,
      skinColor:updateAvi.skinColor
    },
    updated:true
}
  dispatch(UPDATEAVI.SUCCESS(result))
};

const GETAVI = createActions("getavi");
export const getavi = () => (dispatch, getState) => {
  dispatch(GETAVI.START());


  const username = getState().auth.login.result.username; 
  let result = getState().users.updateavi.result
  if (result === null ){
    result = {
      avatar:{
        username: username,
        topType: 'NoHair',
        accessoriesType: 'Blank',
        hairColor: 'null',
        hatColor: 'null',
        facialHairType: 'Blank',
        clotheType: 'ShirtCrewNeck',
        clotheColor: 'Gray01',
        graphicType: 'Skull',
        eyeType: 'Default',
        eyebrowType: 'Default',
        mouthType: 'Default',
        skinColor: 'Light'
      },
      updated:true
  }
  }

  dispatch(GETAVI.SUCCESS(result))
};

const GETUSER = createActions("getuser");
export const getuser = userName => (dispatch, getState) => {
  dispatch(GETUSER.START());

  console.log(userName);
  let username = '';  
  if (userName.username === ':username' || userName === undefined || userName === null) {
    username = getState().auth.login.result.username;
  }else if(typeof userName === "string"){
    username = userName;
  }else{
    username = userName.username;
  }
  console.log(username);

  return fetch(url + `/${username}`, {
    method: "GET",
    headers: jsonHeaders,
  })
    .then(handleJsonResponse)
    .then(result => dispatch(GETUSER.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(GETUSER.FAIL(err))));
};

const EXPLOREUSERS = createActions("exploreusers");
export const exploreusers = () => dispatch => {
  dispatch(EXPLOREUSERS.START());

  return fetch(url, {
    method: "GET",
    headers: jsonHeaders
  })
    .then(handleJsonResponse)
    .then(result => {
      // console.log(result)
      dispatch(EXPLOREUSERS.SUCCESS(result))
    })
    .catch(err => Promise.reject(dispatch(EXPLOREUSERS.FAIL(err))));
};

export const reducers = {
  signup: createReducer(asyncInitialState, {
    ...asyncCases(SIGNUP) //setting up switch statement 
  }),
  deleteuser: createReducer(asyncInitialState, {
    ...asyncCases(DELETEUSER) //setting up switch statement 
  }),
  updateuser: createReducer(asyncInitialState, {
    ...asyncCases(UPDATEUSER) //setting up switch statement 
  }),
  updateavi: createReducer(asyncInitialState, {
    ...asyncCases(UPDATEAVI) //setting up switch statement 
  }),
 getavi: createReducer(asyncInitialState, {
    ...asyncCases(GETAVI) //setting up switch statement 
  }),
  exploreusers: createReducer(asyncInitialState, {
    ...asyncCases(EXPLOREUSERS) //setting up switch statement 
  }),
  getuser: createReducer(asyncInitialState, {
    ...asyncCases(GETUSER) //setting up switch statement 
  })
};