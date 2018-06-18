## Configuring Routes

Now we can setup our routes using the `$routeProvider` in the `.config()` callback, see how we accept it as an argument and Angular will give us what we need:

```js
app.config(function ($routeProvider) {
  $routeProvider
    .when('/inbox', {
      templateUrl: 'views/inbox.html',
      controller: 'InboxCtrl',
      controllerAs: 'inbox'
    })
    .when('/inbox/email/:id', {
      templateUrl: 'views/email.html',
      controller: 'EmailCtrl',
      controllerAs: 'email'
    })
    .otherwise({
      redirectTo: '/inbox'
    });
});
```

The `$routeProvider` is really declarative and easy to use, we just declare what view template to use when the URL is pointing to a particular path.  Working hand in hand with the `ng-view` attribute we previously set in our `index.html`, these template files will now be injected for the described routes.

Our app will have an inbox view, and a single view for injecting the clicked on Email into.

The first view will be injected at `/inbox`, and the second will be `inbox/email/:id`. You'll notice the second route has `:id` at the end - this is a dynamic view. It means that an object with an id as a property (with a value) will be used in the URL, which makes all views dynamic. We'll then use this to make a server call to get the email that corresponds with the id.

If you look closely, you'll notice each view has a particular Controller. Later versions of Angular (we're using one of the latest) ship with a new Controller syntax, the `"Controller as"` syntax, which instantiates the Controller like an Object and binds it to the current scope under a namespace. The namespace we've chosen for `InboxCtrl` is `inbox`.

###### Note: You can also declare "Controller as" in-line. It'd look like this: `ng-controller="InboxCtrl as inbox"`.
