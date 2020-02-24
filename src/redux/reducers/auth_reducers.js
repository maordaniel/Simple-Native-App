const initState = {
    isLogged: false,
    username: null,
    authLoginDetails: null,
};

const capitalizeFirstLetter = string=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
     };

const auth_reducers = (state =  initState, action) =>{
    switch (action.type) {
        case "SUCCESS_LOGIN":
            return state = {...state, isLogged: true};
        case "SUCCESS_LOGOUT":
            return state = {...state, isLogged: false, username: null, authLoginDetails:null};
        case "SUCCESS_SET_USERNAME":
            return state = {...state, username: capitalizeFirstLetter(action.payload)};
        case "SUCCESS_AUTH_LOGIN_DETAILS_USER":
            return state = {...state, authLoginDetails: action.payload};
        default:
            return state;
    }
};

export default auth_reducers;
