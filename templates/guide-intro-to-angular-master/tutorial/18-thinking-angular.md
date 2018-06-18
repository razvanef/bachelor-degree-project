## Thinking Angular

When moving from something like website development to Angular you can be  tempted to use jQuery selectors (since you already know how to use jQuery). You need to avoid doing that. Angular takes care of the DOM. Do not modify it yourself, unless you _really_ need to or are using a plugin. Anything you'll likely want to do, Angular can do.

Getting the value of a textarea? You might be tempted to do this:

```html
<textarea></textarea>
<script>
    var elem = document.querySelector('textarea');
    var value = elem.value;
</script>
```

With Angular, the `ng-model` will keep this updated for us, we just reference it:

```html
<textarea ng-model="myModel"></textarea>
<script>
    app.controller('SomeCtrl', function SomeCtrl($scope) {
      // binds and keeps the value updated at all times
      // no need to re-query the value at any time
      // which means we can pass the value straight
      // back to the server for example
      $scope.myModel = '';
    })
</script>
```

You can read more about [two-way databinding here](https://docs.angularjs.org/guide/databinding).

## About Thinkful's Intermediate Frontend in AngularJS Course

Thinkful offers a complete AngularJS course which takes you from novice to whiz. Our project-based curriculum was designed by Google's Angular expert, Matias Niemela and, throughout the course, you build eight awesome projects including:
- A custom calendar
- A signup form
- A multipage application for gathering country information using a third party API
- A URL shortening application

Interested in learning more? Head over to [Thinkful.com](http://www.thinkful.com/) and select the AngularJS course.
