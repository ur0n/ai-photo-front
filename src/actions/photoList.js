import { FETCH_PHOTO_LIST, FETCH_PHOTO_LIST_SUCCESS, FETCH_PHOTO_LIST_FAILURE } from '../constants/photoList';

export function fetchPhotosFromAPI(){
  return dispatch => {
    dispatch(fetchPhotoList());
    fetch("http://e85bce76.ngrok.io/list?page=1&lim=100")
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson)
      dispatch(fetchPhotoListSuccess(resJson));
    }).catch(err => {
      console.log(err);
      dispatch(fetchpPhotoListFailure(err));
    })
  }
}

export function fetchPhotoList(){
  return {
    type: FETCH_PHOTO_LIST
  }
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
  }
}
