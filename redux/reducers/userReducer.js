const INITIAL_STATE = {
  name: "",
  results: null,
  countriesData: null,
  viewPage: "NEWS",
  cases: null,
  countries: null
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

    case "SET_VIEW_PAGE": {
      return {
        ...state,
        viewPage: action.pageName
      };
    }

    case "UPDATE_CASES_RESULTS": {
      return {
        ...state,
        cases: action.results
      };
    }

    case "UPDATE_COUNTRIES": {
      return {
        ...state,
        countries: action.results
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
