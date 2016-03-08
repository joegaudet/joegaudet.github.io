---
layout: post
title:  "Affordances, Signifiers, and Moscow Mules"
comments: true
categories: [design]
---

I take pride in really caring about the design of the software I build. I can usually tell when it's good, when the visuals and 
interactions are dialled in. But, I rarely have a clear idea of how to get there. 

Thankfully, I've been lucky over the years to work with some really great designers[^1] who have helped show me the way. 

In an effort to learn some more of their language I've been reading '[The Design of Everyday Things](https://books.google.ca/books?id=nVQPAAAAQBAJ&source=gbs_similarbooks)'.
So far it's a very interesting read. An analysis of the design and psychology of everyday things. I--like many no doubt-- 
share his ceaseless frustration with poorly designed doors. The ones that fail to signal whether I should push or pull
 them. 

This video about these so called 'norman doors' from vox - brought me to the book:
  
{% include youtubePlayer.html id='yY96hTb8WgI' %}


### Some Terminology

The first few chapters introduce two basic terms 'Affordances' and 'Signifiers': 

> An affordance is a relation between an object or an environment and an organism that, 
through a collection of stimuli, affords the opportunity for that organism to perform an action. 
For example, a knob affords twisting, and perhaps pushing, while a cord affords pulling. 
As a relation, an affordance exhibits the possibility of some action, 
and is not a property of either an organism or its environment alone.[^2].

> Affordances define what actions are possible. Signifiers specify how people discover those possibilities: 
signifiers are signs, perceptible signals of what can be done. Signifiers are of far more importance to designers than are affordances.[^3].

### Confounded By Limes

Now, I'm by no means an expert after reading a third of the book, so I'm pretty unlikely to add much to any conversation 
on these two words. But, I did want to share a funny story that immediately came to my mind as I was reading. 

When I first met James he was very into [Moscow Mules](https://en.wikipedia.org/wiki/Moscow_mule). It should surprise no
 one that James' mule game was--On Point. He'd sorted out the best Jamaican ginger beer, may have even been ordering it by
   the crate. But the one thing we couldn't get a handle on was this top of the line lime juicer he had, the [FreshForce™ Lime Juicer](http://www.chefn.com/freshforcetm-citrus-juicer-lime.html).
   
![Seriously this juicer tho](/images/posts/signifiers/juicer.jpg)

While it may be obvious from this picture above that you put the lime in face down, it took us __weeks__  and many shots
of lime to the eye to come to that conclusion. The signifying lure of that hemisphere was too great for us to ignore, 
like a siren singing us to our *citrusey* doom.

Now you might be saying we should have just read the instructions, and in this case you're probably right. But just the same
 one of the differences between a good design and a great design is the latter __doesn't let you do it the wrong way__.
The juicer afforded me the ability to squish a lime, but it signified that I aught to match the shape of the lime to the
 shape of the juicer. The design should have assumed--quite correctly--that I might not possess the deductive 
 reasoning to try the __one other__ possible state of the lime position, and rather disallowed __any__ illegal states.

The lessons of affordance, signifiers, and discoverability need not be limited to visual and interaction design. Software 
developers can take the lessons of the FreshForce into their APIs, making it hard for another developer to use your
gem, jar, or JSON service in the 'wrong' way will make up for the inevitable lack or staleness of documentation.

.joe out.
 
[^1]:[Megs](https://www.linkedin.com/in/megdeutscher), [Ryan](http://madebytheory.com/), [Meg](http://www.meg.is/)
[^2]:[https://en.wikipedia.org/wiki/Affordance](https://en.wikipedia.org/wiki/Affordance)
[^3]:[https://www.interaction-design.org/literature/book/the-encyclopedia-of-human-computer-interaction-2nd-ed/affordances](https://www.interaction-design.org/literature/book/the-encyclopedia-of-human-computer-interaction-2nd-ed/affordances)

