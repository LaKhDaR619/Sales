const initialState = {
  customers: [],
  customersLoading: true,
};

export default function customersReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'SET_CUSTOMERS_LOADING': {
      return {
        ...state,
        customersLoading: true,
      };
    }
    case 'GET_CUSTOMERS_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        customersLoading: false,
      };
    }
    case 'GET_CUSTOMERS_FAILED': {
      return {
        ...state,
        customers: [],
        customersLoading: false,
      };
    }
    case 'ADD_CUSTOMER_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        customersLoading: false,
      };
    }
    case 'ADD_CUSTOMER_FAILED': {
      return {
        ...state,
        customersLoading: false,
      };
    }
    case 'DELETE_CUSTOMER_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        customersLoading: false,
      };
    }
    case 'DELETE_CUSTOMER_FAILED': {
      return {
        ...state,
        customersLoading: false,
      };
    }
  }

  return state;
}
