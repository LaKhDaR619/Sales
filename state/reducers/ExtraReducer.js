const initialState = {
  resetAddOrder: true,
};

export default function ExtraReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_RESET_ADD_ORDER': {
      return {
        ...state,
        resetAddOrder: action.payload.reset,
      };
    }
  }
  return state;
}
