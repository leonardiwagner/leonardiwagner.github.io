---
layout: post
title: "Debian Unstable: is it the best Linux Distro?"
description: "Why it can be better than Ubuntu or Arch for bleeding-edge users"
date: 2020-03-19
image: /assets/images/debian_unstable.jpg
tags: [continuous-deployment, continuous-integration, aws, lambda]
comments: true
share: true
---

# Debian Unstable (sid): Is it the best Linux Distro?


## Why Debian Unstable over Debian Stable or Ubuntu?

Debian Stable is released only on every 2 years! That's the price for being rock-stable. It's not a problem to use dated software from years ago, the time-proof safety and focusing only on security rather releasing new updates are the reasons to be the most popular Linux distribution for almost 20 years on servers.

However, we enthusiasts always like to have the latest features and swap a bit of stability to be updatated and there's where Debian Unstable shines on! It works as rolling-release, which means there are no release cycles, every day you have updates with freshly made software versions!

Ubuntu isn't rolling-release but is released every 6 months only. It's a good option for not wasting time updating your distro, but if you don't like bloatware and want to customize your system, stick with Debian Unstable!

## Why Debian Unstable over Arch Linux?

Now we have a real comparison! They are both rolling-release and without embedded bloatware. My reasons to prefer Debian Unstable is due to Debian/Ubuntu popularity: almost every Linux software is distributed on *.deb packages, tons of answered questions on the internet and it's backed by a large community and daily working professionals, moreover, you can use the same knowledge working on Debian and Ubuntu servers.

Don't get me wrong, Arch Linux has a fair community and people use their free time to maintain unofficial packages, but it isn't the same. On the other hand, Debian Unstable isn't an official distribution like Arch  (I'll explain that moreover), so Arch may be more stable because maintainers are just focused on it. If you don't have the same reasons I had to still choose Debian Unstable, go for Arch!

## Is the Debian Unstable distro.. unstable?

No, the Unstable distro is actually very stable, you can use it daily for a year without any problem at all, just like any other major Linux distribution. The name "unstable" simply exists because it's less stable than the official Debian Stable release, that's all! Don't worry about the name. 

I'm not saying there will never have any problem. I was using for more than a year as my main distro when I had an issue with dependencies that broke some apps. No Netflix session on that night! However, it was fixed when I updated again in the morning.

Using a rolling-release distro doesn't imply that you should update every day! My recommendation is to update only after you finished all your work and learn how to rollback a broken update.

## Hey, wait, you didn't mention the Debian Testing!

Debian Testing is a release between Debian Stable and Debian Unstable. It sounds like a "perfect spot" to use Debian, right? WRONG! It's the worst option! Debian Testing contains only frozen states of Debian Unstable, which means if something is broken there, it'll stay broken for days, security issues included!

You may hear Ubuntu and other distros are based on Debian Testing, that's true but they actually maintain and care about the health and security of their based state to the final-users, so always favor Ubuntu over Debian Testing.

## "Debian Unstable isn't an official release and it's not recommended for end-users."
I often read that argumentation and that's true! But first, let's understand the reasons: Debian has only one only official release which is Debian Stable, period, it's the only thing they want to "sell". There's no desire to be bleeding-edge or rolling-release, the focus is to be stable and secure. That's why they won't recommend Unstable even when their developers using it! Debian Unstable is just what Debian Stable will become in the future. 

Ironically it happens similarly with Fedora distro, which later will become Red Hat Linux, but both are released as official distributions, that's the difference. So don't stick only with names, they can confuse you and lead you to take wrong choices.