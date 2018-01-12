export const SET_LANGUAGE = 'SET_LANGUAGE';

export function setLanguage(language) {
  return {
    type: SET_LANGUAGE,
    language,
  };
}

export function changeLanguage(language) {
  return (dispatch) => {
    dispatch(setLanguage(language));
  };
}
