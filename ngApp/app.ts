angular.module("myapp", ['ui.bootstrap', "userRoutes", "ngAnimate"])

.config(function($httpProvider) {
  $httpProvider.interceptors.push("AuthInterceptors");
})
