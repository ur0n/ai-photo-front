import { POST_PHOTO, POST_PHOTO_SUCCESS, POST_PHOTO_FAILURE } from '../constants/postPhoto';

export function storePhotoToServer(photo){
  return dispatch => {
    dispatch(postPhoto())
    const form = createForm(photo);
    // fetch('http://http://133.242.229.206/', {
    fetch('http://e85bce76.ngrok.io', {
      method: 'POST',
      body: form,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data;'
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

function createForm(photo){
  const photoForm = {
    uri: photo.uri,
    type: 'image/jpg',
    name: 'test.jpg'
  }

  const form = new FormData();
  form.append("file", photoForm);
  return form;
}
