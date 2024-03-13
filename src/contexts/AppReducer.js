const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userId: action.payload.userId,
        role: action.payload.userRole,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export default AppReducer;
