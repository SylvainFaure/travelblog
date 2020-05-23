import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import ngFileUpload from 'ng-file-upload';
import ngSanitize from 'angular-sanitize';
import toastr from "angular-toastr";
import $ from "jquery";
global.$ = global.jQuery = $;

// Services; factories
import ApiService from './services/ApiService';
import AuthService from './services/AuthService';
import TextEditor from './services/TextEditor';
import DateService from './services/DateService';

// Routes, config
import Router from './app.route';
import AuthInterceptor from './app.interceptor';

// Controllers
import HomeController from './controllers/HomeController';
import ArticleController from './controllers/ArticleController';
import ArticlesController from './controllers/ArticlesController';
import TravelsController from './controllers/TravelsController';
import TravelController from './controllers/TravelController';
import AssetsController from './controllers/AssetsController';
import LoginController from './controllers/LoginController';
import UserRequestController from './controllers/UserRequestController';
import AnecdotesController from './controllers/AnecdotesController';
import AnecdoteController from './controllers/AnecdoteController';

// Components
import * as asideMenuComponent from "./components/aside-menu/aside-menu.component";
import * as assetPickerComponent from "./components/asset-picker/asset-picker.component";
import * as tagComponent from "./components/tag/tag.component";
import * as textEditorComponent from "./components/text-editor/text-editor.component";
import * as editorCompComponent from "./components/editor-comp/editor-comp";
import * as previewEditorComponent from "./components/preview-editor/preview-editor";

// Filters
import byTag from './filters/tag.filter';
import trustedUrl from './filters/trustedUrl.filter';

// Style, semantic
import "./vendors/semantic/components/modal";
import "./vendors/semantic/components/dropdown";
import "./vendors/semantic/components/checkbox";
import "./vendors/semantic/components/dimmer";
import "./vendors/semantic/components/transition";
import "./vendors/semantic/components/progress";
import "./vendors/semantic/components/accordion";
import "./vendors/semantic/components/popup";
import "./vendors/semantic/components/calendar";
import "./vendors/semantic/components/tab";

//import './vendors/semantic/semantic.min.css';
import './vendors/semantic/themes/default/assets/images/flags.png';

import '../css/app.admin.scss';
import '../../node_modules/angular-toastr/dist/angular-toastr.css';

// Personal dependencies

const dependencies = [
  uirouter,
  ngFileUpload,
  ngSanitize,
  toastr,
]


angular
  .module('admin', dependencies)
  .service('ApiService', ApiService)
  .service('AuthService', AuthService)
  .service('TextEditor', TextEditor)
  .service('DateService', DateService)
  .config(Router)
  .config(($httpProvider) => {
    $httpProvider.interceptors.push(AuthInterceptor);
  })
  .controller('HomeController', HomeController)
  .controller('TravelsController', TravelsController)
  .controller('TravelController', TravelController)
  .controller('ArticlesController', ArticlesController)
  .controller('ArticleController', ArticleController)
  .controller('AssetsController', AssetsController)
  .controller('LoginController', LoginController)
  .controller('UserRequestController', UserRequestController)
  .controller('AnecdotesController', AnecdotesController)
  .controller('AnecdoteController', AnecdoteController)
  .component('asideMenu', asideMenuComponent.asideMenuComponent)
  .component('assetPicker', assetPickerComponent.assetPickerComponent)
  .component('tag', tagComponent.tagComponent)
  .component('textEditor', textEditorComponent.textEditorComponent)
  .component('editorComp', editorCompComponent.editorCompComponent)
  .component('previewEditor', previewEditorComponent.previewEditorComponent)
  .filter('byTag', byTag)
  .filter('trustedUrl', trustedUrl)
  .config(toastrConfig => {
    angular.extend(toastrConfig, {
      positionClass: 'toast-bottom-right',
      timeOut: 3000
    });
  })
  .run(($transitions, $rootScope) => {
    const devPorts = ['3000', '3001']
    if (!$rootScope.rvm) {
      $rootScope.rvm = {}
    }
    if (window.location.hostname.indexOf("localhost") !== -1 && devPorts.includes(window.location.port)) {
      $rootScope.rvm.debug = true;
      $rootScope.rvm.fr = true;
      $rootScope.rvm.it = false;
    } else {
      $rootScope.rvm.fr = true;
      $rootScope.rvm.it = false;
    }
    $transitions.onStart({}, ($transition) => {
      if ($transition.$to().name !== 'logged') {
        $rootScope.rvm.isHome = false
      } else {
        $rootScope.rvm.isHome = true
      }
    })
  })
