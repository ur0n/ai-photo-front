import {
  FETCH_SEASON_PHOTO_LIST,
  FETCH_SEASON_PHOTO_LIST_SUCCESS,
  FETCH_SEASON_PHOTO_LIST_FAILURE,
  CHANGE_SEASON,
  CHANGE_PAGE
} from '../constants/season';

const initialState = {
  seasonPhotoList: {
    Spring: {
      isFetched: false,
      photos: []
    },
    Summer: {
      isFetched: false,
      photos: []
    },
    Autumn: {
      isFetched: false,
      photos: []
    },
    Winter: {
      isFetched: false,
      photos: []
    }
  },
  thisSeason: "Spring",
  error: false
}

export default function seasonReducer(state = initialState, action){
  switch (action.type) {
    case FETCH_SEASON_PHOTO_LIST_SUCCESS:
    return {
      ...state,
      seasonPhotoList: {
        ...state.seasonPhotoList,
        [state.thisSeason]: {
          isFetched: true,
          Photos: action.data.Photos
        }
      }
    };
    break;
    case FETCH_SEASON_PHOTO_LIST_FAILURE:
    return {
      ...state,
      seasonPhotoList: {
        ...state.seasonPhotoList,
        [state.thisSeason]: {
          ...state.seasonPhotoList[state.thisSeason],
          isFetched: false
        }
      },
      error: true
    };
    break;
    case CHANGE_SEASON:
    return {
      ...state,
      thisSeason: action.season
    }
    break;
    default:
    return state;
  }
}
