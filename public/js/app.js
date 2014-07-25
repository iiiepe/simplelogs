var app = angular.module("app", ["ngResource", "ngRoute", "ui.bootstrap", "angularMoment"]);

/**
 * Define the router configuration function
 */
function router($routeProvider) {
  $routeProvider
    .when("/", {
      redirectTo: "/dashboard"
    })
    .when("/dashboard", {
      controller: "ListLogs",
      templateUrl: "templates/logslist"
    })
    .when("/sources", {
      controller: "ListSources",
      templateUrl: "templates/sourceslist"
    })
    .when("/api", {
      templateUrl: "templates/api"
    })
    .when("/404", {
      templateUrl: "templates/404"
    })
    .otherwise({
      redirectTo: "/404"
    })
}

// Add the router to the configurationre
app.config(router);

// Configuration for angular/momentjs
app.constant("angularMomentConfig", {
  preprocess: "unix",
  // timezone: "America/Monterrey"
})

app.baseUrl = "";
