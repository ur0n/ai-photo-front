import { FETCH_PHOTO_LIST, FETCH_PHOTO_LIST_SUCCESS, FETCH_PHOTO_LIST_FAILURE, SET_PAGE } from '../constants/photoList';

export function fetchPhotosFromAPI(page){
  return dispatch => {
    dispatch(fetchPhotoList());
    dispatch(setPage(page));
    return fetch(`http://aiph.work/list?page=${page}&lim=20`)
    .then(res => res.json())
    .then(resJson => {
      dispatch(fetchPhotoListSuccess(resJson));
    }).catch(err => {
      console.log(err);
      dispatch(fetchpPhotoListFailure(err));
    })
  };
}

export function fetchPhotoList(){
  return {
    type: FETCH_PHOTO_LIST
  };
}

export function setPage(page){
  return {
    type: SET_PAGE,
    page
  };
}

export function fetchPhotoListSuccess(data){
  return {
    type: FETCH_PHOTO_LIST_SUCCESS,
    data
  }
}

export function fetchpPhotoListFailure(err){
  return {
    type: FETCH_PHOTO_LIST_FAILURE,
    err
  };
}
