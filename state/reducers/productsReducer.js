const initialState = {
  products: [],
  productsLoading: true,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PRODUCTS_LOADING': {
      return {
        ...state,
        productsLoading: true,
      };
    }
    case 'GET_PRODUCTS_SUCCESS': {
      console.log('GET_PRODUCTS_SUCCESS');
      console.log(action.payload.products);
      return {
        ...state,
        ...action.payload,
        productsLoading: false,
      };
    }
    case 'GET_PRODUCTS_FAILED': {
      return {
        ...state,
        productsLoading: false,
        products: [],
      };
    }
    case 'ADD_PRODUCT_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        productsLoading: false,
      };
    }
    case 'ADD_PRODUCT_FAILED': {
      return {
        ...state,
        productsLoading: false,
      };
    }
    case 'EDIT_PRODUCT_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        productsLoading: false,
      };
    }
    case 'EDIT_PRODUCT_FAILED': {
      return {
        ...state,
        productsLoading: false,
      };
    }
    case 'DELETE_PRODUCT_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        productsLoading: false,
      };
    }
    case 'DELETE_PRODUCT_FAILED': {
      return {
        ...state,
        productsLoading: false,
      };
    }
  }

  return state;
}
