const initialState = {
  users: [],
  usersLoading: true,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USERS_LOADING': {
      return {
        ...state,
        usersLoading: true,
      };
    }
    case 'GET_USERS_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        usersLoading: false,
      };
    }
    case 'GET_USERS_FAILED': {
      return {
        ...state,
        users: [],
        usersLoading: false,
      };
    }
    case 'ADD_USER_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        usersLoading: false,
      };
    }
    case 'ADD_USER_FAILED': {
      return {
        ...state,
        usersLoading: false,
      };
    }
    case 'DELETE_USER_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        usersLoading: false,
      };
    }
    case 'DELETE_USER_FAILED': {
      return {
        ...state,
        usersLoading: false,
      };
    }
  }

  return state;
}
