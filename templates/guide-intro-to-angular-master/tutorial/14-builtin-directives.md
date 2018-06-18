## Built-in Directives

Angular ships with some really useful Directives, such as `ng-show`, `ng-repeat` and `ng-click`. There are many built-in Directives, and more get added each release to help enhance how we build our apps.

Our Directives will evaluate based on data. For example `ng-show="someData"` will evaluate when the value of `someData` is `true`. If the value is `false`, it will hide the element.

One of the most powerful Angular Directives is `ng-repeat`, which iterates over Objects (or items) in an Array:

```html
<ul>
  <li ng-repeat="item in items">
    {{ item.name }}
  </li>
</ul>
```

You may have spotted this in our directive's template where we iterated over our messages and also filter them based on the `search`.

```html
<li ng-repeat="message in inbox.messages | filter:{ from: inbox.search }">
```

But where did `inbox.search` come from?  Well this was created by the `ng-model` directive that we attached to an input field.

```html
<input type="text" class="inbox__search" placeholder="Search"
  ng-model="inbox.search" >
```

Now, whenever someone types into this field, it will set the `inbox.search` property and update the `ng-repeat`'s filter. Pretty wild, right?!

So all these `ng-` attributes are directives created just the same as how we make our own directives. We can use them anywhere in our application.

> Code check: [07-ng-repeat](https://github.com/Thinkful/guide-intro-to-angular/tree/master/clean/07-ng-repeat)

View the result by downloading the _Code check_ and opening the `index.html` file in your browser. Play around with the `fruits` values inside `index.html` and refresh your page to see how everything updates.