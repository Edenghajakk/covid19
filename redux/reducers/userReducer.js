const INITIAL_STATE = {
  name: "",
  results: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_NAME": {
      return {
        ...state,
        name: action.name
      };
    }
    case "UPDATE_RESULTS": {
      return {
        ...state,
        results: action.results
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
