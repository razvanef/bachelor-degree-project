## Templating

Let's talk a little more about the View file's we've been using. You may have noticed that inside our template we were using the properties that we added to scope directly inside `{{ }}`.  These are called *expressions* and we can put some basic JavaScript in there too, as well as a bunch of filters.

```html
<!-- JavaScript inside expression -->
<h1>{{ [ firstName, lastName ].join(" ") }}</h1>
<!-- currency filter applied to a multiplication of 2 numbers -->
<div class="total-info">{{ cost * quantity | currency }}</div>
<!-- Using a ternary expression inside the expression -->
<div class="budget">{{ ( total > budget ) ? "Too Expensive" : "You can buy it!" }}</div>
```

Angular will *interpolate* these expressions: above we have made use of 3 little examples of how powerful expressions are.

The first one, we create an array and put two String $scope variables inside it, then we join the two together with a `" "` to display the name in a `<h1>`.

The second we multiply two Number $scope variables together and then apply a currency filter on them. You can read more about filters [here](https://docs.angularjs.org/api/ng/filter) in the Angular documentation.

The third line of code we make use of a [JavaScript ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) inside the expression to check whether the Number $scope property `total` is greater than the budget property and display the appropriate message in the div.

The JavaScript inside an assigned controller would be as so:

```js
$scope.firstName = "John";
$scope.lastName = "Doe";
$scope.cost = 1;
$scope.quantity = 2;
$scope.total = 3;
$scope.budget = 4;
```

These templates are an essential aspect to Angular as we can not only make the mappings of data that you've seen already, but we can also introduce custom elements completely!  In Angular these are called *directives* and come with their own templates (either in another html file or a string, the same as how controllers operate).

As mentioned before, it often helps to see the code in action. View the result by downloading the _Code check_ and opening the `index.html` file in your browser. You can also tweak the `$scope` values inside `index.html`.

> Code check: [05-templating](https://github.com/Thinkful/guide-intro-to-angular/tree/master/clean/05-templating)

View the result by downloading the _Code check_ and opening the `index.html` file in your browser. Play around with the `$scope` values inside `index.html` and refresh your page to see how everythign updates.
