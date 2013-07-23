---
layout: post
title:  "Fast clicks with AngularJS"
date:   2013-07-19 16:35:07
comments: true
categories: [angular, mobile]
---

At Learndot we've been building with AngularJS for about a month. Our first project was porting the 'Learner experience' from our existing SproutCore project and bringing it to Angular. This will be my first of a few posts detailing some interesting fun bits we've put together while playing with it, and it will go over implementing a fast click directive for mobile web experiences.

One of the shortcomings to building a native feeling web app in iOS is the ~300ms delay on click handlers. This delay is due to the browser waiting for a second tap to fire a double click event. 

{% highlight html %}
	<button onclick="someClickFunction()">An Button</button>
{% endhighlight %}

In most cases this feature is more of a bug than anything, creating a sluggish user experience - combined with the webkit tap highlight effect and html buttons really won't cut the mustard.

Google has written a really great article about [implementing fast buttons](https://developers.google.com/mobile/articles/fast_buttons). 

Directives are really the 'killer feature' of Angular, allowing you to extend the semantics of html to suit your needs. And as such I've created an AngularJS directive which makes use of [Modernizr](http://modernizr.com/) to allow for fast clicks like so:

{% highlight html %}
	<button fast-click="someClickFunction()">An Button</button>
{% endhighlight %}


Before we get started, you should have a functional knowledge of AngularJS [directives](httpu//docs.angularjs.org/guide/directive). There's nothing fancy going on in this one, but just the same the details of how they function won't be covered. Also you should give the google article a read through to understand the cases that we are trying to handle.

First things first: make sure you have Modernizr included in your project, I created a simple provider that will allow Modernizr to be injected into our directive rather than accessed globally. We use Modernizr to detect if we are on a touch device, or not, later on in the directive.

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

You'll notice we've injected two dependencies into our fast-click directive. The first is $parse, which we will convert the angular expression which is passed to the directive into a function - this snippet is taken from the ng-click directive which ships with angular, we wrap it in our own function for a bit of DRYness. We also wrap the actual meat of the handler in a cancel check which allows us interrupt handling in cases where someone has dragged their finger along the button (read: swiped).

{% highlight js %}

clickFunction = function (event) {
	// if something has cause this handler to be
	// canceled lets prevent execution
	if (!canceled) {
		scope.$apply(function () {
    	fn(scope, {$event: event});
		});
	}
};

{% endhighlight %}

Now we setup our click handlers, the main difference between this implementation and the google implementation is that we use Modernizer to determine if we have a touch enabled device or not. This prevents us from needing to attach to the click function as of the writing of the google article it may have been needed in order to have the browser treat the button as a button, it does not appear to be the case any longer (verified on android and iOS latest versions)

This approach also prevents us from needing a click debouncer (or buster) which simplifies things a great deal by avoiding putting event handlers on the body - it also keeps things contained to this one directive.

{% highlight js %}

/**
 * If we are actually on a touch device lets
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

All of the code is available here : [https://github.com/joegaudet/ng-fast-click](https://github.com/joegaudet/ng-fast-click).

.joe out.

