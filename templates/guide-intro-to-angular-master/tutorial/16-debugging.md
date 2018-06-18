## Debugging

Debugging in Angular can be very difficult and frustrating. This section will give you the foundation you need to simplify the process.

#### Stack Trace Function Names

Angular uses a lot of anonymous functions in the call stack. When these throw an error (yes, you'll see a lot of errors during development), to make things easier to debug, I've named anonymous functions.

Here it is before:

```js
app.factory('InboxFactory',
  function ($q, $http) {}
):
```

...and now after:

```js
app.factory('InboxFactory',
  function InboxFactory ($q, $http) { }
):
```

This will then show errors `at InboxFactory` rather than `at anonymous`. A handy tip for developing Angular apps.

#### Routing Problems

Another debugging tip when working with routes is to listen for Routing Events to be triggered on the `$rootScope`.  A suitable place for this is the `run` function, [found here](https://docs.angularjs.org/guide/module#module-loading-dependencies), which can be thought of as a 'controller for the module', but try to keep this section as small as possible!

```js
app.run(function($rootScope){
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
    console.log(event, current, previous, rejection)
  })
});
```

The above example sets an event listener for any errors that occur during a route change.

#### Debugging Scopes

Here's a great article for [debugging scopes](http://ionicframework.com/blog/angularjs-console/).
