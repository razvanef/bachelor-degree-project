## Cloaking

###### Note: Cloaking is a bit of an advanced trick but we thought you might enjoy it :) Feel free to skip over this section if you'd like.

Angular has a really neat built-in feature called cloaking, which you can declare on an Element to tell Angular it needs cloaking (hide it) whilst it's still rendering. Cloaking allows you to hide any handlebars you might see flicker before Angular has rendered and loaded your data. E.g. `{{user.name}}` before the user data has had time to load.

When `lib/angular.js` has loaded, AngularJS automatically appends an inline `<style></style>` element to your document with cloaking styles to hide elements during load. This can sometimes take a second to load as it's got a JavaScript dependency too, so I recommend setting up the `<head></head>` of your document manually like this:

```html
<!doctype html>
<html ng-app="app">
  <head>
    <style>
    [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
      display: none !important;
    }
    </style>
  </head>
  <body>
  </body>
</html>
```

This is 100% reliable and hides any cloaked elements immediately, even without Angular loaded. Applying cloaked styles is easy:

```html
<div ng-cloak>
  {{ someData }}
</div>
```
