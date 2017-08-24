import { FETCH_SEASON_PHOTO_LIST, FETCH_SEASON_PHOTO_LIST_SUCCESS, FETCH_SEASON_PHOTO_LIST_FAILURE, CHANGE_SEASON } from '../constants/season';

const initialState = {
  seasonPhotoList: {
    Spring: [],
    Summer: [],
    Autumn: [],
    Winter: []
  },
  thisSeason: "Spring",
  isFetched: false,
  error: false
}

export default function seasonReducer(state = initialState, action){
  switch (action.type) {
    case FETCH_SEASON_PHOTO_LIST:
    return{
      ...state,
      isFetched: false
    };
    break;
    case FETCH_SEASON_PHOTO_LIST_SUCCESS:
    return {
      ...state,
      isFetched: true,
      seasonPhotoList: {
        ...state.seasonPhotoList,
        [action.season]: action.data
      }
    };
    break;
    case FETCH_SEASON_PHOTO_LIST_FAILURE:
    return {
      ...state,
      isFetched: false,
      error: true
    };
    break;
    case CHANGE_SEASON:
    return {
      ...state,
      thisSeason: action.season
    }
    default:
    return state;
  }
}
