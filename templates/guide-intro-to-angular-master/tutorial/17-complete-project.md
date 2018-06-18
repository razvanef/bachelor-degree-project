## The Complete Project

INCLUDE VIDEO HERE

Now you can finally download the complete project. It demonstrates all the key features we've gone through in this article.

We've made a bunch of changes to the project to give it a more complete feel, here's a list of what we did:

1. We added a new route for specific Email messages that accepts an `:id` parameter
2. We added some slick CSS styles :)
3. We changed our controllers to all make use of the 'Controller As' syntax
4. We added the ngSanitize library to use the `ng-bind-html` directive in the Email directive
5. We uncommented the goToMessage method in our Inbox Factory that will navigate to the new route
6. We simplified our controllers further so they now only use the title on 'this' (Controller As)
7. We added the Email Controller and view
8. We added the Email Factory which adds a bunch of factory and JavaScript alerts where server communication would be appropriate
9. We added the Email Directive and its template as well as using it in our Email View
10. We added new JSON files for each of the messages
11. We added the ng-cloak, however it isn't used in this application as ngView covers this for us :)

I would encourage you to have a read through the code and try to understand what's happening. You may of course find much more suitable ways to accomplish the same results to your own liking, this is just an example for learning purposes but we've been sure to include a number of good thinking points for you to work from.

You may be able to find some other little tricks we've included such as `$timeout`, `ng-bind-html` and last but certainly not least `$watch`.

> Code check: [final-section](https://github.com/Thinkful/guide-intro-to-angular/tree/master/clean/final-section)

__Note:__ To run this Code check you'll need to:
- Make sure you've downloaded the code. Do this by going [here](https://github.com/Thinkful/guide-intro-to-angular/tree/clean) and either cloning the repo or clicking "Download Zip".
- In your terminal, navigate to the project folder (e.g. `/Users/carl/Downloads/guide-intro-to-angular/app/final-section`)
- Run a simple local server. On a Mac, you can do this by running `python -m SimpleHTTPServer`. If you're on windows, try doing this by installing [Mongoose](https://code.google.com/p/mongoose/).
- In your browser, go to `http://localhost:8000/`
