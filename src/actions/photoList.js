import { FETCH_PHOTO_LIST, FETCH_PHOTO_LIST_SUCCESS, FETCH_PHOTO_LIST_FAILURE, UPDATE_PHOTO_LIST_SUCCESS, SET_PAGE } from '../constants/photoList';

function fetchPhotosFromAPI(page, fn){
  return fetch(`http://aiph.work/list?page=${page}&lim=20`)
  .then(res => res.json())
  .then(resJson => {
    fn(resJson);
  })
}

export function getPhotoList(page){
  return dispatch => {
    dispatch(fetchPhotoList());
    return fetchPhotosFromAPI(page, resJson => {
      dispatch(setPage(page));
      dispatch(fetchPhotoListSuccess(resJson));
    }).catch(err => {
      dispatch(fetchpPhotoListFailure(err));
    })
  };
}

export function updatePhotoList(){
  return dispatch => {
    dispatch(fetchPhotoList());
    return fetchPhotosFromAPI(1, resJson => {
      dispatch(updatePhotoListSuccess(resJson));
    }).catch(err => {
      dispatch(fetchpPhotoListFailure(err));
    })
  }
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

export function updatePhotoListSuccess(data){
  return {
    type: UPDATE_PHOTO_LIST_SUCCESS,
    data
  };
}

export function fetchpPhotoListFailure(err){
  return {
    type: FETCH_PHOTO_LIST_FAILURE,
    err
  };
}
