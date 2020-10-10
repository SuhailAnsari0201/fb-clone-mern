export const initialState = {
  token: null,
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  LOAD_USER: "LOAD_USER",
};

const reducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionTypes.LOAD_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default reducer;
