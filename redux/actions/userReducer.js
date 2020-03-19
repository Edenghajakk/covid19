export const updateName = name => ({
  type: "UPDATE_NAME",
  name
});

export const updateResults = results => ({
  type: "UPDATE_RESULTS",
  results
});

export const setViewPage = pageName => ({
  type: "SET_VIEW_PAGE",
  pageName
});

export const updateTotal = results => ({
  type: "UPDATE_CASES_RESULTS",
  results
});

export const updateCountries = results => ({
  type: "UPDATE_COUNTRIES",
  results
})