## Directives Overview

Directives are Angular's take on custom HTML elements, they offer a very reusable way to encapsulate data, templates and behaviors.

In our View file we might have something like this:

```html
<div id="someview">
    {{ data.scopePropertyAsUsual }}
    <my-custom-element></my-custom-element>
</div>
```

Where the `<my-custom-element>` above will be injected with our directive template and logic. Here's what the basic directive structure might look like:

```js
app.directive('myCustomElement', function myCustomElement(){
    return {
        restrict: 'EA',
        replace: true,
        scope: true,
        template: [
            "<div>",
            "   <h1>My Custom Element's Heading</h1>",
            "   <p>Some content here!</p>",
            "   <pre>{{ ctrl.expression | json }}</pre>",
            "</div>"
        ].join(""),
        controllerAs: 'ctrl',
        controller: function ($scope) {
            this.expression = {
                property: "Example"
            }
        },
        link: function (scope, element, attrs) {}
    }
});
```

As you can see the name of the directive is camelCased (`myCustomElement`) whereas the html element is hyphen-separated (`<my-custom-element></my-custom-element>`), this is an angular convention for directive naming.

Next, we return a JavaScript Object with various properties on it to describe how the directive works. Here's a quick run through of what some of the Directive properties mean (feel free to skim through this):

* `restrict`: allows you to restrict how the element is declared, `E = Element`, `A = Attribute`, there are other ways of declaring (such as a comment) but I wouldn't recommend them as they're not that friendly with older browsers.
* `replace`: replaces the Directive's root element, in this case would be `<inbox></inbox>`.
* `scope`: tells Angular to use an isolated or inherited scope, these concepts are quite tricky to grasp, but setting to `true` inherits the parent scope and keeps sibling directives more independent, which makes things easier to work with. There are cases where isolated scopes (`scope: {}`) are the better choice depending on what we're doing.
* `template`: I've recently used an `[].join('')` style for templating, it's much cleaner to work with and we can start the first line of the template on a new line, rather than having a huge indent.
* `templateUrl`: the same as `template`, but will point to a template file such as `tmpl/inbox-directive.html` instead of being a string.
* `controllerAs`: creates a namespace for our Controller when instantiated
* `controller`: inject dependencies and bind logic, you may also expose an API for other directives to interact with this one through the 'controllerAs' and `this` of the controller.
* `link`: a place to write non-Angular logic, but tie it in with Angular. You'll have access to the current scope, the template element root (first element in template rather than Directive root) and the attributes on the element declared.

These are some of the most commonly used properties, though you can check the [documentation](https://docs.angularjs.org/api/ng/service/$compile#directive-definition-object) (found under the $compile section of the API) for other properties. You can also browse [Angular's documentation on directives](https://docs.angularjs.org/guide/directive).

###### Note: Here's a [great video introducing Angular directives](https://www.youtube.com/watch?v=0r5QvzjjKDc).

Directives are not just custom elements, they are much more... you can use them for all sort of custom logic, especially when you want to reuse some code. (Gotta keep it [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself).)
