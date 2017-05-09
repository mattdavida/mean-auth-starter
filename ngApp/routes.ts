angular.module("userRoutes", ["ngResource", "ui.router"])

.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    // Define routes
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/ngApp/views/home.html',
            controller: myapp.Controllers.HomeController,
            controllerAs: 'controller'
        })
        .state('about', {
            url: '/about',
            templateUrl: '/ngApp/views/about.html',
            controller: myapp.Controllers.AboutController,
            controllerAs: 'controller'
        })
        .state('login', {
            url: '/login',
            templateUrl: '/ngApp/views//users/login.html',
        })
        .state('logout', {
            url: '/logout',
            templateUrl: '/ngApp/views//users/logout.html',
        })
        .state('register', {
            url: '/register',
            templateUrl: '/ngApp/views/users/register.html',
            controller: myapp.Controllers.RegController,
            controllerAs: 'register'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: '/ngApp/views/users/profile.html'
        })
        .state('notFound', {
            url: '/notFound',
            templateUrl: '/ngApp/views/notFound.html'
        });

    // Handle request for non-existent route
    $urlRouterProvider.otherwise('/notFound');

    // Enable HTML5 navigation
    $locationProvider.html5Mode(true);
});
