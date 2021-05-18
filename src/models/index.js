/**
 * Created by Sanchit
 */
import User from './user';
import Admin from './admin';
import Token from './token';
import SSO from './sso';
import Story from './story';

const ForgetPassword = require('./forgotPasswordRequest');

export default {
  User,
  ForgetPassword,
  Admin,
  Token,
  SSO,
  Story
}