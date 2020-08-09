const initialState = {
  orders: [],
  orderDetails: [],
  ordersLoading: true,
  orderDetailsLoading: true,
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    // ORDERS
    case 'SET_ORDERS_LOADING': {
      return {
        ...state,
        ordersLoading: true,
      };
    }
    case 'GET_ORDERS_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        ordersLoading: false,
      };
    }
    case 'GET_ORDERS_FAILED': {
      return {
        ...state,
        orders: [],
        ordersLoading: false,
      };
    }
    case 'ADD_ORDER_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        ordersLoading: false,
      };
    }
    case 'ADD_ORDER_FAILED': {
      return {
        ...state,
        ordersLoading: false,
      };
    }
    case 'DELETE_ORDER_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        ordersLoading: false,
      };
    }
    case 'DELETE_ORDER_FAILED': {
      return {
        ...state,
        ordersLoading: false,
      };
    }
    // ORDERS_DETAILS
    case 'SET_ORDER_DETAILS_LOADING': {
      return {
        ...state,
        orderDetailsLoading: true,
      };
    }
    case 'GET_ORDER_DETAILS_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        orderDetailsLoading: false,
      };
    }
    case 'GET_ORDER_DETAILS_FAILED': {
      return {
        ...state,
        orderDetails: [],
        orderDetailsLoading: false,
      };
    }
  }

  return state;
}
