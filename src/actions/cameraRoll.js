import { GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILURE, SELECT_PHOTO } from '../constants/cameraRoll';
import { CameraRoll } from 'react-native';

export function getPhotosForCameraRoll(){
  return dispatch => {
    console.log("getting photos....");
    dispatch(getPhotosStart());
    CameraRoll.getPhotos({first: 100})
    .then(obj => {
      const photos = obj.edges.map(asset => asset.node.image);
      dispatch(getPhotosSuccess(photos));
    })
    .catch(err => dispatch(getPhotosFailure(err)));
  }
}

export function selectUploadPhoto(photo){
  return dispatch => {
    dispatch(selectPhoto(photo));
  }
}

export function getPhotosStart(){
  return {
    type: GET_PHOTOS
  };
}

export function getPhotosSuccess(data){
  return {
    type: GET_PHOTOS_SUCCESS,
    data
  };
}

export function getPhotosFailure(err){
  return {
    type: GET_PHOTOS_FAILURE,
    err
  };
}

export function selectPhoto(data){
  return {
    type: SELECT_PHOTO,
    data
  };
}
