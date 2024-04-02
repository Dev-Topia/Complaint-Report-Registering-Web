const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userId: action.payload.userId,
        role: action.payload.userRole,
        token: action.payload.token,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_SINGLE_COMPLAINT":
      return {
        ...state,
        singleComplaint: action.payload,
      }
    default:
      return state;
  }
};

export default AppReducer;
