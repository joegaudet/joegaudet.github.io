---
layout: post
title:  "Evernote + Vim = ♥"
comments: true
categories: [random, vim, evernote]
---

Thanks to many years of badgering by [@jamesgolick](https://twitter.com/jamesjolick), [@prlambert](https://twitter.com/prlambert), 
and [@agonigberg](https://twitter.com/agonigberg) I use Vim or IDEAVim for pretty much everything. For my money it's the 
best way to edit structured text - I even go so far as to write these posts using markdown and vim (Checkout if you'd like to do the same [https://jekyllrb.com/](https://jekyllrb.com/)).

But, this isn't a post to espouse the many wonders of Vim--though they be countless--not least of which is its presence on
nearly every server everywhere ever. But rather to share the process of making Vim and Evernote the best of friends.

### Sharing is Caring 

When I started working at [Hootsuite](http://hootsuite.com) I resolved to be more diligent with my note taking. Some for 
my self, and some so I could share things with my colleagues. However, when you work in an interdisciplinary team,
getting people to checkout your git repo of notes isn't a reasonable proposition. 

Thankfully the folks at Evernote have already done a fantastic job developing a swell note collaboration,
sharing, and organization tool.

### Optional: Setup Two Factor Authentication 

If you're like me and keep work notes in Evernote, 2-FA is the way to go to keep your security folks happy and your IP safe. 
In general I try and make sure its enabled on every service that offers it (gmail, github et al).

Follow these instructions to get it setup: 

[Two-Step Verification Available to All Users](https://blog.evernote.com/blog/2013/10/04/two-step-verification-available-to-all-users/)

### Installing Geeknote

Geeknote is a CLI to interface with Evernote's REST APIs - you won't need to do much other than set it up and and authenticate 
your self with your user name and password  (If you've setup 2-FA you will need your authenticator code as well)

{% highlight bash %}

# Download the repository.
$ git clone git://github.com/VitaliyRodnenko/geeknote.git

$ cd geeknote

# Installation
$ [sudo] python setup.py install

# Launch Geeknote and go through login procedure.
$ geeknote login

{% endhighlight %}

### Installing vim-geeknote

[vim-geeknote](https://github.com/neilagabriel/vim-geeknote) is a great vim plugin that--as its name suggests--allows
 you to use Evernote inside of a nice two panel vim view.

First install Vundle by following the instructions posted at:
 
[https://github.com/VundleVim/Vundle.vim](https://github.com/VundleVim/Vundle.vim).

Vundle is a plugin manager for vim, there is also Pathogen which I've never tried but I'm sure does the trick as well. Once 
you're done that, add the following to your .vimrc and run :BundleInstall.

{% highlight bash %}
Bundle 'https://github.com/neilagabriel/vim-geeknote'
{% endhighlight %}

### Bonus Points - alias for easy launching

I like to do my note editing in MacVim so I have a nice environment to alt+tab into, so I added the following line to my .zshrc to alias notes to launch
vim-geeknote in mvim 

{% highlight bash %}
alias notes='mvim -c Geeknote'
{% endhighlight %}

![MacVim up and running with my Geeknotes](/images/posts/evernote-vim/vim-geeknote.png)

### Make like an elephant

There you have it, with a few simple steps you can get Evernote up an running in vim and leave the flashy UI to the less
enlightened.

Happy Vimming! :)

.joe out.

