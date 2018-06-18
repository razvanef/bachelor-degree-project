## What's a Factory?

Angular Factories can be used for many different things. Some of the most common use-cases are [server-side](http://en.wikipedia.org/wiki/Server-side) communication via HTTP and abstracting Models to persist application state and changes accross controllers. Angular Factories are a great way to create reusable features and code blocks throughout our application.

__Key takeaway:__ If you want to communicate with a [RESTful API](http://stackoverflow.com/questions/671118/what-exactly-is-restful-programming/#answer-671132), do it through a factory! If you want to store a 'CurrentUser' with authentication information, do it in a factory!

###### Note:  You may have heard of factories as a design pattern in many programming languages, but Angular's factories are different to those in practice (maybe not in spirit :).

You can create a factory using the `angular.factory()` method like so:

```js
app.factory('ExampleFactory', function ExampleFactory($rootScope, $http, $location) {
    return function myReusableFunction(){
        // do something fancy
    };
});
```

Notice how we're injecting a few different things here, such as: `$rootScope`, `$http`, `$location`. We'll cover these in a bit.

It's often good practice to create an `exports` Object inside your Factories and return it. This helps with explicit internal naming which helps you see which methods / variables are private or not ([closures](http://stackoverflow.com/questions/111102/how-do-javascript-closures-work) [ftw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)).

In this app, we'll need to get our messages, so let's create a function to do that. Angular uses the `$http` service to communicate with the server, so we'll inject it:

```js
app.factory('InboxFactory', function InboxFactory ($http) {
    var exports = {};
    
    exports.getMessages = function () {
        return $http.get('json/emails.json')
            .error(function (data) {
                console.log('There was an error!', data);
            });
    };

    return exports;
});
```

### $http

This will use $http to make a GET request to our "json/emails.json" file; here we also set a default error handler for the http request by chaining a method onto the [promise](http://andyshora.com/promises-angularjs-explained-as-cartoon.html) returned by `$http.get()`.  Yes that's right, `$http()` returns a promise! So we can use all of the [Angular promise API](https://docs.angularjs.org/api/ng/service/$q), the same as we would use a `$q.defer().promise` object, with a few extras: namely `error(fn)` and `success(fn)`.  `success(fn)` and `error(fn)` are two "sugar" methods that are very similar to `then(fn)` and `catch(fn)` but specific to `$http`.

###### Note: What are "sugar" methods? In simple terms. Syntactic sugars are a feature in a programming language that lets you express an idea in a more convenient way.

You can view [Angular's $http documentation here](https://docs.angularjs.org/api/ng/service/$http).

> Code check: [04-inbox-factory](https://github.com/Thinkful/guide-intro-to-angular/tree/master/clean/04-inbox-factory)

###### Note: To run this Code check you'll need to:
- Make sure you've downloaded the code. Do this by going [here](https://github.com/Thinkful/guide-intro-to-angular/tree/clean) and either cloning the repo or clicking "Download Zip".
- In your terminal, navigate to the project folder (e.g. `/Users/carl/Downloads/guide-intro-to-angular/app/04-inbox-factory`)
- Run a simple local server. On a Mac, you can do this by running `python -m SimpleHTTPServer`. If you're on windows, try doing this by installing [Mongoose](https://code.google.com/p/mongoose/).
- In your browser, go to `http://localhost:8000/`
