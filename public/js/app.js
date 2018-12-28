
import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import ngFileUpload from 'ng-file-upload';

import _ from 'lodash';
import $ from "jquery";
global.$ = global.jQuery = $;

// Services; factories
import ApiService from './services/ApiService';
import TextEditor from './services/TextEditor';

// Routes, config
import Router from './app.route';

// Controllers
import HomeController from './controllers/HomeController';
import ArticleController from './controllers/ArticleController';
import ArticlesController from './controllers/ArticlesController';
import TravelsController from './controllers/TravelsController';
import TravelController from './controllers/TravelController';
import AssetsController from './controllers/AssetsController';

// Components
import * as asideMenuComponent from "./components/aside-menu/aside-menu.component";
import * as assetPickerComponent from "./components/asset-picker/asset-picker.component";
import * as tagComponent from "./components/tag/tag.component";
import * as textEditorComponent from "./components/text-editor/text-editor.component";
import * as editorCompComponent from "./components/editor-comp/editor-comp";
import * as editorCompTitle from "./components/editor-title/editor-title";

// Filters
import byTag from './filters/tag.filter';

// Style, semantic
import "../vendors/semantic/components/modal";
import "../vendors/semantic/components/dimmer";
import "../vendors/semantic/components/transition";
import "../vendors/semantic/components/progress";
import "../vendors/semantic/components/accordion";
import "../vendors/semantic/components/popup";

import '../css/app.scss';

const dependencies = [
  uirouter,
  ngFileUpload
]


angular
  .module('admin', dependencies)
  .service('ApiService', ApiService)
  .service('TextEditor', TextEditor)
  .config(Router)
  .controller('HomeController', HomeController)
  .controller('TravelsController', TravelsController)
  .controller('TravelController', TravelController)
  .controller('ArticlesController', ArticlesController)
  .controller('ArticleController', ArticleController)
  .controller('AssetsController', AssetsController)
  .component('asideMenu', asideMenuComponent.asideMenuComponent)
  .component('assetPicker', assetPickerComponent.assetPickerComponent)
  .component('tag', tagComponent.tagComponent)
  .component('textEditor', textEditorComponent.textEditorComponent)
  .component('editorComp', editorCompComponent.editorCompComponent)
  .component('editorTitle', editorCompTitle.editorTitleComponent)
  .filter('byTag', byTag)
  .run($rootScope => {
    if (!$rootScope.rvm) {
      $rootScope.rvm = {}
    }
    $rootScope.rvm.debug = true;
    $rootScope.rvm.fr = true;
    $rootScope.rvm.it = false;
  })


