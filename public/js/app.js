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
      templateUrl: "html/logslist"
    })
    .when("/sources", {
      controller: "ListSources",
      templateUrl: "html/sourceslist.html"
    })
    .when("/api", {
      templateUrl: "html/api"
    })
    .when("/404", {
      templateUrl: "html/404.html"
    })
    .otherwise({
      redirectTo: "/404"
    })
}

// Add the router to the configuration
app.config(router);

// Configuration for angular/momentjs
app.constant("angularMomentConfig", {
  preprocess: "unix",
  // timezone: "America/Monterrey"
})

app.baseUrl = "";
