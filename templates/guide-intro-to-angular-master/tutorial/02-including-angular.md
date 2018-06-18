## Getting started with AngularJS

Angular comes as a single `.js` file that needs to be included at the bottom of your HTML page. I'd advise putting it there rather than in the `<head>` for better document rendering.

###### Note: You need to add the AngularJS library before we can get any of the Angular goodies working and see what they do. Let's do just that!


For this app we're going to use `version 1.2.22` which at the moment of writing this is the most recent.  This is recommended for now as other third party plugins will have not been tested on the latest beta versions.

To download AngularJS go to [AngularJS.org](https://angularjs.org/) and click on the blue "Download" button. Select the 'legacy' branch, which is the latest stable build, and click "Download".

Your HTML should look like this:

```html
<html>
    <head>
    </head>
    <body>
        <div></div>
        <script src="lib/jquery-v1.11.1.js"></script>
        <script src="lib/angular-v1.2.22.js"></script>
    </body>
</html>
```

###### Note: We're also including jQuery.

Angular comes with something called 'jQLite' built in. It's a jQuery-like micro-library that Angular packages internally. jQLite is very light (as the name implies) and doesn't have many of the great jQuery methods that you might need. It's also good to consider that many plugins you might need will likely depend on the full jQuery library.

__Good to know:__ Angular uses the full jQuery library if it's loaded - so I've loaded it before Angular so it can detect it and use it instead of jQLite.

> Code check: [01-include-angular](https://github.com/Thinkful/guide-intro-to-angular/tree/clean/app/01-include-angular)
