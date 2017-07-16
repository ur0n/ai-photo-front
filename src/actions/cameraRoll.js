import { GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILURE } from '../constants/cameraRoll';
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
