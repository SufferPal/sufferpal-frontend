import { SET_USER, SET_PROFILE_PICTURE_S3_KEY, SET_PROFILE_PICTURE_HREF } from './action-types';

const reducer = (state = {}, action) => {
  if (typeof action === 'undefined') {
    return state;
  }

  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_PROFILE_PICTURE_S3_KEY:
      return {
        ...state,
        profilePictureS3Key: action.profilePictureS3Key,
      };
    case SET_PROFILE_PICTURE_HREF:
      return {
        ...state,
        profilePictureHref: action.profilePictureHref,
      };
    default:
      return state;
  }
};

export default reducer;
