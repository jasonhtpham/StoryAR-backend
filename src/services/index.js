import GenericService from './genericService';

import ForgetPasswordService from './forgetPasswordService';

import UserExtendedProfileService from './userExtendedProfileService'

export default {
  UserService: new GenericService('User'),
  ForgetPasswordService,
  UserExtendedProfileService: new GenericService(''),
  AdminService: new GenericService('Admin'),
  TokenService: new GenericService('Token'),
  SSOManagerService: new GenericService('SSO'),
  StoryService: new GenericService('Story')
};
