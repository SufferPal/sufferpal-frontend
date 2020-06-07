import { SET_USER, SET_PROFILE_PICTURE_S3_KEY, SET_PROFILE_PICTURE_HREF } from './action-types';

export const setUser = (user) => ({ user, type: SET_USER });
export const setProfilePictureS3Key = (profilePictureS3Key) => ({
  profilePictureS3Key,
  type: SET_PROFILE_PICTURE_S3_KEY,
});
export const setProfilePictureHref = (profilePictureHref) => ({ profilePictureHref, type: SET_PROFILE_PICTURE_HREF });
