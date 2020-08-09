import en from '../../languages/en.json';
import ar from '../../languages/ar.json';

const initialState = {
  lang: 'ar',
  words: ar,
  useAnimation: false,
  settingsLoading: true,
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SETTINGS_LOADING': {
      return {
        ...state,
        settingsLoading: true,
      };
    }
    case 'SET_SETTINGS_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        words: action.payload.lang == 'en' ? en : ar,
        settingsLoading: false,
      };
    }
    case 'SET_SETTINGS_FAILED': {
      return {
        ...state,
        lang: 'ar',
        words: ar,
        useAnimation: false,
        settingsLoading: false,
      };
    }
    case 'GET_SETTINGS_SUCCESS': {
      return {
        ...state,
        ...action.payload,
        words: action.payload.lang == 'en' ? en : ar,
        settingsLoading: false,
      };
    }
    case 'GET_SETTINGS_FAILED': {
      return {
        ...state,
        lang: 'ar',
        words: ar,
        useAnimation: false,
        settingsLoading: false,
      };
    }
  }

  return state;
}
