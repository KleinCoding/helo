import Axios from "axios";

const initialState = {
  user_id: null,
  username: null
};

const GET_SESSION = "GET_SESSION";
const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";


export function getSession() {
  return {
    type: GET_SESSION,
    payload: Axios.get("/auth/user")
  };
}

export function registerUser(newUser) {
  return {
    type: REGISTER_USER,
    payload: Axios.post("/auth/register", newUser)
  };
}

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: Axios.post("/auth/login", user)
  };
}


export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${GET_SESSION}_PENDING`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${GET_SESSION}_FULFILLED`: {
      return {
        ...state,
        user_id: payload.data.user_id,
        username: payload.data.username
      };
    }
    case `${REGISTER_USER}_PENDING`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${REGISTER_USER}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        user_id: payload.data.user_id,
        username: payload.data.user
      }
    }
    case `${LOGIN_USER}_PENDING`: {
      return {
        ...state
      };
    }
    case `${LOGIN_USER}_FULFILLED`: {
      return {
        ...state,
        user_id: payload.data.user_id,
        username: payload.data.username
      };
    }
    default:
      return state;
  }
}
