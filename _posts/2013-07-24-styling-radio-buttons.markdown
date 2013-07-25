---
layout: post
title:  "Styling Radio Buttons with CSS"
comments: true
categories: [css, html]
---
Working off the article found [here](http://webdesign.tutsplus.com/tutorials/htmlcss-tutorials/quick-tip-easy-css3-checkboxes-and-radio-buttons/), I've created a quick example of pure css-html styled radio buttons. 

The linked article does fine for creating the style, but setting the radio button to `display: none`, prevents the radio group from being able to gain focus. As such your website will suffer some in the usability department. 

As before we start with a radio group, for this example I've put them in a list.

{% highlight html %}

<ul class="radio-group">
	<li>
		<input id="choice-a" type="radio" name="g" />
		<label for='choice-a'>
			<span><span></span></span>
			Choice A
		</label>
	</li>
	<li>
		<input id="choice-b" type="radio" name="g" />
		<label for='choice-b'>
			<span><span></span></span>
			Choice B
		</label>
	</li>
	<li>
		<input id="choice-c" type="radio" name="g" />
		<label for='choice-c'>
			<span><span></span></span>
			Choice C
		</label>
	</li>
	<li>
		<input id="choice-d" type="radio" name="g" />
		<label for='choice-d'>
			<span><span></span></span>
			Choice D
		</label>
	</li>
</ul> 

{% endhighlight %}

Additionally you'll notice that I've included two spans, the second span is used to create the dot in the middle of the radio button.

And now for some style.

First we position the list relatively, and hide the radio button by making transparent and positioning it absolutely (`opacity: 0; position: absolute;`). This hides it in the top left corner of every list item making sure the document scrolls to the proper location when the button gain focus - a pleasant bonus of this approach is it doesn't mess with your layout of the span and label.

{% highlight css %}

ul.radio-group li {
    position: relative;
    list-style: none;
    padding: 10px;
}

input[type="radio"] {
  opacity: 0;
  position: absolute;
}

{% endhighlight %}

Next we make use of the `+` operator and the `:focus` and `:checked` selectors to style the span nodes we've included with our label. 

{% highlight css %}
/* Matches the direct descendant of a label preceded by a 
   radio button */
input[type="radio"] + label > span {
  position: relative;
  border-radius: 14px;
  width: 20px;
  height: 20px;
  background-color: #f0f0f0;
  border: 1px solid #bcbcbc;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  margin: 0 1em 0 0;
  display: inline-block;
  vertical-align: middle;
}

/* Matches the direct descendant of a label preceded by a 
   checked radio button */
input[type="radio"]:checked + label > span {
  background: linear-gradient(#a0e5f8, #75c7dc);
  background: -webkit-linear-gradient(#a0e5f8, #75c7dc);
  border-color: #41a6bf;
  box-shadow: 0px 1px 2px rgba(65, 166, 191, 0.9) inset;
}

/* Matches a span contained by the direct descendant 
   of a label preceded by a checked radio button */
input[type="radio"]:checked + label > span span {
	display: inline-block;
	width: 8px;
	height: 8px;
	position: absolute;
	left: 6px;
	top: 6px;
	border-radius: 5px;
	border: none;
	background: #167c95;
	box-shadow: 0px 1px rgba(255, 255, 255, 0.3);
}

input[type="radio"]:focus + label > span {
  box-shadow: 0px 0px 6px rgba(63, 165, 190, 1);
}

{% endhighlight %}

![Pure CSS styled radio buttons](images/css-radio-buttons.png)

And there you have it, a pure css + html styled radio button that answers to tab / arrow events. A working example can be found [here](http://cssdeck.com/labs/13ykupq3). To see the focus effect you must first click in the output window to focus the iframe.

Feel free to comment and correct below.

.joe out.
