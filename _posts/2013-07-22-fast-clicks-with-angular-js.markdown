---
layout: post
title:  "Fast clicks with AngularJS"
comments: true
categories: [angular, mobile]
---

At Learndot we've been building with AngularJS for about a month. Our first project was porting the Learner experience from our existing SproutCore project and bringing it to Angular. We've managed to throw together some interesting little bits with it in a relatively short amount of time, in this post I will go over implementing a fast click directive for mobile web experiences.

One of the difficulties in building a native feeling web app in iOS is the ~300ms delay on click handlers. This delay is due to the browser waiting for a second tap to fire a double click event. 

{% highlight html %}
	<button onclick="someClickFunction()">An Button</button>
{% endhighlight %}

In most cases this feature is more of a bug than anything, creating a sluggish user experience.

Google has written a really great article about [implementing fast buttons](https://developers.google.com/mobile/articles/fast_buttons). 

Directives are really the 'killer feature' of Angular, allowing you to extend the semantics of html to suit your needs. And as such I've created an AngularJS directive which makes use of [Modernizr](http://modernizr.com/) to allow for fast clicks like so:

{% highlight html %}
	<button fast-click="someClickFunction()">An Button</button>
{% endhighlight %}


Before we get started, you should have a functional knowledge of AngularJS [directives](httpu//docs.angularjs.org/guide/directive). There's nothing fancy going on in this one, but the details of how they function won't be covered.Also you should give the Google article a read to understand the cases that we are trying to handle.

First make sure you have Modernizr included in your project. I created a simple provider that will allow Modernizr to be injected into our directive rather than accessed globally. We use Modernizr to detect if we are on a touch device later on in the directive.

{% highlight js %}
angular
.module('fast-click')
.provider('Modernizr', function () {

  'use strict';

  this.$get = function () {
    return Modernizr || {};
  };
});
{% endhighlight %}

Next let's define our fast click directive 

{% highlight js %}

angular
.module('fast-click')
.directive('fastClick', function ($parse, Modernizr) {

	'use strict';

	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

	 	}
	};
});

{% endhighlight %}

You'll notice we've injected two dependencies into our fast-click directive. The first is $parse, which converts the angular expression that is passed to the directive into a function - this snippet is taken from the ng-click directive which ships with angular, we wrap it in our own function for a bit of DRYness

{% highlight js %}

clickFunction = function (event) {
	// if something has caused this handler to be
	// canceled lets prevent execution
	if (!canceled) {
		scope.$apply(function () {
    	fn(scope, {$event: event});
		});
	}
};

{% endhighlight %}

We also wrap the actual meat of the handler in a cancel check which allows us interrupt handling in cases where someone has dragged their finger along the button (read: swiped).

Now we setup our click handlers, the main difference between this implementation and the Google implementation is that we use Modernizer to determine if we have a touch enabled device or not. In the Google article the claim that in order for the button to be treated by the browser as a button, it must have an onclick function - this no longer appears to be the case in at least the most recent versions of webkit on both iOS and Android. 

This approach removes the need for a click debouncer (or buster) as there will not be a second click event fired that may be caught by the body node or any other node in the DOM. This simplifies things a great deal an it keeps things contained to this one directive.

{% highlight js %}

/**
 * If we are actually on a touch device, let's
 * setup our fast clicks
 */
if (Modernizr.touch) {

  element.on('touchstart', function (event) {
    event.stopPropagation();

    var touches = event.originalEvent.touches;

    startX = touches[0].clientX;
    startY = touches[0].clientY;

    element.trigger('mousedown');
    canceled = false;
  });

  element.on('touchend', function (event) {

    event.stopPropagation();
    element.trigger('mouseup', true);

    clickFunction();
  });

  element.on('touchmove', function (event) {
    var touches = event.originalEvent.touches;

    // handles the case where we've swiped on a button
    if (Math.abs(touches[0].clientX - startX) > 10 ||
      Math.abs(touches[0].clientY - startY) > 10) {
      canceled = true;
    }
  });
}

/**
 * If we are not on a touch enabled device lets bind
 * the action to click
 */
if (!Modernizr.touch) {
  element.on('click', function (event) {
    clickFunction(event);
  });
}

{% endhighlight %}

And that's it, you can now use the fast click directive exactly as you would ng-click. If you want to be fully html5 compliant toss an x- or data- in front of fast-click, just be sure to update the directive definition.

All of the code is available here: 

[https://github.com/joegaudet/ng-fast-click](https://github.com/joegaudet/ng-fast-click)

If you've got any questions, comments, problems, suggestions or otherwise just wanna chat - comment below, or ping me on [twitter](https://twitter.com/joegaudet).


.joe out.


