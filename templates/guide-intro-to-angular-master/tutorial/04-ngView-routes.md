## ngView and Routes

Another important building block that can connect certain URLs of our application to scopes is the `ng-view` directive.

```html
<html ng-app="myApp">
    <head>
    </head>
    <body>
        <div ng-view></div>
    </body>
</html>
```

The `ng-view` attribute here will tell Angular where we wish to inject HTML based on the URL a user visits.

In this sample project, we'll want to have an inbox view. When a user visits the `/inbox` URL our (yet to be created) inbox.html file would be injected inside the `ng-view`. The inbox.html file would also have it's corresponding controller (`InboxCtrl`).

Angular encourages the "single page application" methodology, which means we never get a full page refresh, all "pages" are injected content via XHR (Ajax). Of course these aren't "pages" as such, they're "views" - which are loaded depending on the URLs a user visits or the application state.