import { FETCH_SEASON_PHOTO_LIST, FETCH_SEASON_PHOTO_LIST_SUCCESS, FETCH_SEASON_PHOTO_LIST_FAILURE, CHANGE_SEASON } from '../constants/season';

export function fetchSeasonListFromAPI(season){
  return dispatch => {
    console.log("--------------------------------------");
    dispatch(fetchSeasonPhotoList());
    fetch(`http://aiph.work/list/${season}?page=1&lim=30`)
    .then(res => res.json())
    .then(resJson => {
      // console.log(resJson);
      dispatch(changeSeason(season));
      dispatch(fetchSeasonPhotoListSuccess(resJson, season));
    }).catch(err => {
      console.log(err);
      dispatch(fetchSeasonPhotoListFailure(err));
    })
  };
}

export function changeSeason(season){
  return {
    type: CHANGE_SEASON,
    season
  };
}

export function fetchSeasonPhotoList(){
  return {
    type: FETCH_SEASON_PHOTO_LIST
  };
}

export function fetchSeasonPhotoListSuccess(data, season){
  return {
    type: FETCH_SEASON_PHOTO_LIST_SUCCESS,
    data,
    season
  };
}

export function fetchSeasonPhotoListFailure(err){
  return {
    type: FETCH_SEASON_PHOTO_LIST_FAILURE,
    err
  };
}
