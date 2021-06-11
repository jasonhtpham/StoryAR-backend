import GenericService from './genericService';

import ForgetPasswordService from './forgetPasswordService';


export default {
  UserService: new GenericService('User'),
  ForgetPasswordService,
  UserExtendedProfileService: new GenericService('UserExtendedProfile'),
  AdminService: new GenericService('Admin'),
  TokenService: new GenericService('Token'),
  SSOManagerService: new GenericService('SSO'),
  StoryService: new GenericService('Story')
};
