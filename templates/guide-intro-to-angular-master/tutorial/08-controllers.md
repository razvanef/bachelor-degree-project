## Controllers

Controllers are the middleman between the Model and the View, they _drive_ the Model and View changes. Imagine that the controller is given some html from the route and a javascript object from the dependency injection; with these two things, the controller will tell the view (the html) what it can do by giving it scope variables and maybe a few functions.

Let's take a peek at what a Controller looks like.

A good Controller will have as little logic in it as possible, and should only be used for two things: Binding the Model to the View (initializing the View) and adding helper functions to the View.

```js
app.controller('InboxCtrl', function () {
    // Model and View bindings
    // Small helper function not needed anywhere else 
});
```

If you go through the Angular documentation examples (available at [AngularJS.org](https://docs.angularjs.org/tutorial)) you'll notice Model data being declared in the Controller. While this is okay for examples, the Controller easily becomes the Model as well - which is very bad for many reasons:

* All the pieces start to get more coupled together
* More difficult to share business logic
* Makes things difficult to test

Remember: A good Controller will have as little logic in it as possible.

Each controller has access to a `$scope` and some html. `$scope` is the most documented way of adding properties and methods to our view. Remember how we said each 'ng-controller' attribute specifies a scope of HTML to manage? Well, that scope has access to the same $scope as the Controller function.

###### Note: `$scope` isn't the only way to pass data to the front end. Many developers use a combination of the "Controller As" configuration options along with the `this` keyword. For the purpose of this tutorial, we will stick with `$scope` as it's been around for much longer than 'Controller As'.

```js
app.controller('InboxCtrl', function ($scope) {
  // initialize the title property to an array for the view to use
  $scope.title = "This is a title";
});
```

###### Note: Notice we're injecting `$scope` inside the function.

We can then use this like so:

```html
<div ng-controller="InboxCtrl">
    {{ title }}
</div>
```

###### Note: Here we're accessing the title directly, however it is encouraged to always have at least one dot (.) in our view expression properties. Using the "controller as" with `this` syntax would solve this giving us the `.` like so `{{ inbox.title }}`. [More info here](http://stackoverflow.com/questions/17178943/does-my-ng-model-really-need-to-have-a-dot-to-avoid-child-scope-problems).

In order to keep our controllers more reusable, we would hook up data in our controller via a Factory or Service.

> Code check: [03-application-controller](https://github.com/Thinkful/guide-intro-to-angular/tree/clean/app/03-application-controller)

###### Note: To run this Code check you'll need to:
- Make sure you've downloaded the code. Do this by going [here](https://github.com/Thinkful/guide-intro-to-angular/tree/clean) and either cloning the repo or clicking "Download Zip".
- In your terminal, navigate to the project folder (e.g. `/Users/carl/Downloads/guide-intro-to-angular/app/03-application-controller`)
- Run a simple local server. On a Mac, you can do this by running `python -m SimpleHTTPServer`. If you're on windows, try doing this by installing [Mongoose](https://code.google.com/p/mongoose/).
- In your browser, go to `http://localhost:8000/`
