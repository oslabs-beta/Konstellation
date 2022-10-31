import ACTIONS from "../constants/constants";

export const authReducer = (state:any, action:any) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return action.payload
    case ACTIONS.LOGOUT:
      return {
        ...action.payload,
        status: null
      }
    default:
      return state;
  }
};