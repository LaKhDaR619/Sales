const initialState = {
  userName: null,
  fullName: null,
  userType: null,
  errorMessage: '',
  loggedIn: false,
  authLoading: true,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AUTH_LOADING':
      return {
        ...state,
        authLoading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload,
        errorMessage: '',
        loggedIn: true,
        authLoading: false,
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        ...action.payload,
        authLoading: false,
      };
    case 'USER_LOGOUT_SUCCESS':
      return {
        ...state,
        userName: null,
        fullName: null,
        userType: null,
        loggedIn: false,
        authLoading: false,
      };
    case 'USER_LOGOUT_FAILED':
      return {
        ...state,
        authLoading: false,
      };
  }

  return state;
}
