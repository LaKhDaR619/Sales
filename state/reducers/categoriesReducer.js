const initialState = {
  categories: [],
  categoriesLoading: true,
};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CATEGORIES_LOADING': {
      return {
        ...state,
        categoriesLoading: true,
      };
    }
    case 'GET_CATEGORIES_SUCCESS': {
      console.log('GET_CATEGORIES_SUCCESS');
      return {
        ...state,
        ...action.payload,
        categoriesLoading: false,
      };
    }
    case 'GET_CATEGORIES_FAILED': {
      return {
        ...state,
        categories: [],
        categoriesLoading: false,
      };
    }
    case 'ADD_CATEGORY_SUCCESS': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'ADD_CATEGORY_FAILED': {
      return {
        ...state,
      };
    }
    case 'DELETE_CATEGORY_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        categoriesLoading: false,
      };
    }
    case 'DELETE_CATEGORY_FAILED': {
      return {
        ...state,
        categoriesLoading: false,
      };
    }
  }

  return state;
}
