import { POST_PHOTO, POST_PHOTO_SUCCESS, POST_PHOTO_FAILURE } from '../constants/postPhoto';

export function storePhotoToServer(photo){
  return dispatch => {
    dispatch(postPhoto())
    const form = createForm(photo);
    fetch('http://aiph.work', {
      method: 'POST',
      body: form,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res);
      dispatch(postPhotoSuccess(res));
    }).catch(err => {
      console.error(err);
      dispatch(postPhotoFailure(err));
    })
  };
}

export function postPhoto(){
  return {
    type: POST_PHOTO
  };
}

export function postPhotoSuccess(data){
  return {
    type: POST_PHOTO_SUCCESS,
    status: data
  }
}

export function postPhotoFailure(err){
  return {
    type: POST_PHOTO_FAILURE,
    err
  }
}

function createForm(data){
  const timestampUTC = getUTCTime(new Date(data.timestamp));
  const body = {
    title: data.title,
    image: data.photo,
    date: timestampUTC.toString(),
    lat: data.location.latitude.toString(),
    long: data.location.longitude.toString()
  }

  return JSON.stringify(body);
}

function getUTCTime(t){
  return Date.UTC(
    t.getFullYear(),
    t.getMonth(),
    t.getDate(),
    t.getHours(),
    t.getMinutes(),
    t.getSeconds()
  );
}
