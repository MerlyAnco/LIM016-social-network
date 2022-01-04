import { SignUp, Register } from './login-signUp/signup.js';
import { Login, initLogin } from './login-signUp/login.js';
import { Home, FunctionsHome } from './home.js';
import { resetPassword, resetPasswordInit } from './resetPassword.js';
import { Profile, FunctionProfile } from './profile.js';
import { navMobile, functionNavMobile } from './navegador/navMobile.js';
import { newPost, functionNewPost } from './newPost.js';
import { profileEdit, FunctionEdit } from './editProfile.js';
import { navLaptop, functionNavLaptop } from './navegador/navLaptop.js';
import { view404, view404Functions } from './404.js';

export const components = {
  login: { Login, initLogin },
  signup: { SignUp, Register },
  home: { Home, FunctionsHome },
  resetPassword: { resetPassword, resetPasswordInit },
  profile: { Profile, FunctionProfile },
  navMobile: { navMobile, functionNavMobile },
  navLaptop: { navLaptop, functionNavLaptop },
  newPost: { newPost, functionNewPost },
  edit: { profileEdit, FunctionEdit },
  view: { view404, view404Functions },
};
