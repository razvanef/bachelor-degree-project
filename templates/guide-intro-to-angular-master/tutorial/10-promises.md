## Promises ($q) and Connecting Our Controller and Factory Together

Promises are very important inside Angular, they allow you to organize functions that take a long time to do things (e.g. HTTP requests). Promises in Angular are implemented with `$q`. The `$q` implementation was inspired by [Kris Kowal's Q](https://github.com/kriskowal/q).

To be honest, `$q` is quite a strange beast. Here's a [great cartoon explaining promises](http://andyshora.com/promises-angularjs-explained-as-cartoon.html). If you'd like to see another practical example, checkout the [Angular $q documentation](https://docs.angularjs.org/api/ng/service/$q).

This is how promises work:
- "Do something when this HTTP request — or another function that takes a long time to complete — has finished"
- "If it all goes well, please do the success function I give to .then()"
- "If it goes wrong, please do the catch function I give to .then()"

Sample code:
```js
var deferred = $q.defer();
deferred.promise.then(
    function whenThingsGoSunny(){},
    function whenThingsDontDoGoSoSunny(){}
)
```

Notice that the first function we pass is the `success` function and the second one is the `error` function.

Promises have quite a few interesting behaviors that you can read about [here](https://docs.angularjs.org/api/ng/service/$q).

When making HTTP requests in Angular you'll often use the `$http` service which is based on `$q`.

As we just saw, `$q` allows you to use `.then()` to include a `success` and an `error` function. When using `$http`, you can do something very similar (but without the `.then()`:

```js
$http({method: 'GET', url: '/someUrl'})
    .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
    })
    .error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
```

Read the [$http documentation](https://docs.angularjs.org/api/ng/service/$http) for more details.

### Hooking up the Factory and Controller

We've got some basic email data inside a Factory setup, and a Controller, so let's connect the two:

```js
app.controller('InboxCtrl', function ($scope, InboxFactory) {
    InboxFactory.getMessages()
        .success(function(jsonData, statusCode){
            console.log('The request was successful!', statusCode, jsonData);
            // Now add the Email messages to the controller's scope
            $scope.emails = jsonData;
        });
});
```

See how the `InboxFactory` factory is available as an injectable in our controller? That's dependency injection helping us out again!

We then call the `getMessages` method on the factory and using the $http()'s `success` method (`$http()` was returned from `getMessages()`), we can then add the list of emails / messages to our controller's `$scope` and use it in the view. i.e. The `success(fn)` is available from chaining when we do `http()` or `http.get()`, etc&hellip;
