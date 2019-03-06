import * as angular from "angular";
import uiRouter from '@uirouter/angularjs';

import ngmap from 'ngmap';
import $ from "jquery";
global.$ = global.jQuery = $;

// Services
import ApiService from "./services/Api.service";

// Config, routes
import Router from "./app.route";

// Controllers 
import HomeController from './controllers/home.controller';
import TravelController from "./controllers/travel.controller";
import PostController from "./controllers/post.controller";
import GalleryController from "./controllers/gallery.controller";

// Components
import * as changeLangComp from "./components/changeLang/changeLang.component"

// Styles
import './../css/app.public.scss';

const dependencies = [
  uiRouter,
  ngmap
]

angular.module('CartesDeVoyage', dependencies)
  .service('ApiService', ApiService)
  .config(Router)
  .controller('HomeController', HomeController)
  .controller('TravelController', TravelController)
  .controller('PostController', PostController)
  .controller('GalleryController', GalleryController)
  .component('changeLang', changeLangComp.changeLangComponent)
