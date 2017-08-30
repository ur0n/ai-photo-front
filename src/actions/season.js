import {
  FETCH_SEASON_PHOTO_LIST,
  FETCH_SEASON_PHOTO_LIST_SUCCESS,
  FETCH_SEASON_PHOTO_LIST_FAILURE,
  CHANGE_SEASON,
  CHANGE_PAGE
 } from '../constants/season';

//TODO pull-up-down to refresh
export function fetchSeasonListFromAPI(season){
  return dispatch => {
    fetch(`http://aiph.work/list/${season}?page=1&lim=30`)
    .then(res => res.json())
    .then(resJson => {
      dispatch(changeSeason(season));
      dispatch(fetchSeasonPhotoListSuccess(resJson));
    }).catch(err => {
      console.log(err);
      dispatch(fetchSeasonPhotoListFailure(err));
    })
  };
}

export function changeTab(season){
  return dispatch => {
    dispatch(changeSeason(season));
  }
}

export function changeSeason(season){
  return {
    type: CHANGE_SEASON,
    season
  };
}

export function fetchSeasonPhotoList(){
  return {
    type: FETCH_SEASON_PHOTO_LIST,
  };
}

export function fetchSeasonPhotoListSuccess(data){
  return {
    type: FETCH_SEASON_PHOTO_LIST_SUCCESS,
    data
  };
}

export function fetchSeasonPhotoListFailure(err){
  return {
    type: FETCH_SEASON_PHOTO_LIST_FAILURE,
    err
  };
}
