## Module(s)
Every app needs a module, and Angular provides us with a namespacing capability for this using `angular.module()`. The method both sets and gets depending how you use it. To create (set) a new module we do this:

```js
angular.module('myApp', []);
```

Notice the empty array, this is where we could put any other named modules as dependencies.  Here we tell angular we're creating the module named 'myApp' with no dependencies.

To get a reference to a module, for registering controllers, factories, filters, etc&hellip; we drop the array and just call the module by name:

```js
angular.module('myApp');
```

###### Note: When we specified the `ng-app="myApp"`, the `"myApp"` part in the module should be the same. Another way to put it, the name of the app has to carry over.

The `angular.module()` method also returns a reference to the module which can make accessing it a little less verbose, however this pattern is discouraged due to potential problems with global variables:

```js
var app = angular.module('app', []);
```