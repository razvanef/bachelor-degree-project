## Routing

The next logical step is to configure our routing, which controls which views are injected into the app based on which URL we're hitting. For example when we're at `/inbox`, we'll want to inject the `inbox.html` view and assign a Controller.  We can use Angular's `$routeProvider` for this.

This is where the real fun begins!

### RouteProvider

Since Angular 1.2.0, the `$routeProvider` hasn't been included in the main Angular build, so we'll need to include it as a separate module.


To download the `$routeProvider` (which lives inside `angular-route`) go to [AngularJS.org](https://angularjs.org/) and click on the blue "Download" button. Click on "Browse additional modules", select `angular-route.js` and save that file.


```html
<body>
    <!-- ... -->
    <!-- Extra routing library -->
    <script src="lib/angular-route-v1.2.22.js"></script>
</body>
```

###### Note: Your angular-route version should match your angular.js version.

You can find the version at the top of any file downloaded from AngularJS.org. It looks like this:

```js
/**
 * @license AngularJS __v1.2.22__
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
```

This file will give us access to an additional module named `ngRoute`, which we need to include (set as a dependency) in our own module:

```js
var app = angular.module('app', [
  'ngRoute'
]);
```

### Config Stage

We saw before how to bind a Controller to the DOM (or to a specific view, to put it another way), which is just one way of doing it. Angular allows you to dynamically assign a Controller through the `$routeProvider` service, which is much more flexible. From now on let's use this instead of using `ng-controller=""` to declare Controllers.

Angular modules each have a `.config()` function, we give this a callback that is run before most other function callbacks in Angular.  This is where we must configure our routes (the different URLs visitors will be able to access).

```js
app.config(function () { /*...*/ });
```

### Dependency Injection

We'll need to use the `$routeProvider` to setup our routes inside the config callback; this is made possible via some magic inside the Angular framework (using function definitions and regex).  We can simply accept `$routeProvider` as an argument to the config function and Angular will understand that we've asked for it.

```js
app.config(function ($routeProvider) {
    /* Now we can use the routeProvider! :D */
});
```
