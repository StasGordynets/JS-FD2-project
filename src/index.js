"use strict";

import $ from 'jquery';
import jQuery from 'jquery';
window.$ = jQuery;
import materialDesignLite from 'material-design-lite/material.min.js';
import MessageModel from './app/MessageModel.js';
import MessageView from './app/MessageView.js';
import MessageController from './app/MessageController';

import NameController from './app/NameController.js';
import NameModel from './app/NameModel.js';
import NameView from './app/NameView';

import AuthController from './app/AuthController.js';
import AuthModel from './app/AuthModel.js';
import AuthView from './app/AuthView';

import MessageService from './app/MessageService';
import Router from './app/Router';

//Media
import newMessage from './audio/newMessage.mp3';
import androidDesktop from './img/android-desktop.png';
import user from './img/user.jpg';
//Favicon
import favicon from './img/favicon.png';
import iosDesktop from './img/ios-desktop.png';
