---
layout: post
title:  "TDD in 5 minutes"
date:   2015-12-12 12:35:00 -0200
categories: jekyll update
---

TDD means test-driven **development**, it's a technique to build software using tests, and not about testing your code.

With TDD you'll write the test before your actual software code, it seems to be tricky, but I'll show how it works with the 3 TDD rules:

**1. First you write a test that will fail:** the test should assert something that you code will achieve, and because the code doesn't exist yet it will naturally fail. On compiled languages such as Java or C#, the build fail is considered as test fail as well to fulfill this rule.

**2. Refactor your code:** here is when you write **only the necessary code to make the test pass** or make improvements.

**3. Make the test pass:** Yes! but when tests are passing it's not finished yet. Once you achieve this stage, you should go to rule 1 again, that's why the second rule is called refactor, and you do continuously this loop on the 3 rules until you realize that your code is accomplishing all requirements.


{:.center}
![enter image description here](https://www.perforce.com/sites/default/files/images/tdd.png)

## Example
> Problem: we need to create a function that needs to sum 2 numbers using TDD

First, we'll write a test that guarantees that we'll achieve the requirement. I'll use a C-like pseudo code to illustrate. To write tests you need a testing library, if you don't know any testing libraries yet please search one for your favorite programming language, mostly they have an assertion method that checks if testing is failing or passing, I'll use `assert(actual, expected)` as assert method in our pseudo code.

{% highlight javascript %}
//test method
function threePlusTwoShouldBeFive(){
  var result = sum(3,2)
  assert(result, 5)
}
{% endhighlight %}

If we run this code, it'll fails, as the `sum()` function doesn't exist yet, so we accomplished the 1st rule. Probably now you understood the TDD mindset of "writing test before your actual software code". Now in the 2nd refactoring rule, we'll write the `sum()` function:

{% highlight javascript %}
function sum(number1, number2){
  return 5
}
{% endhighlight %}

Why the result `5` is hard-coded ? If it seems like I'm just cheating to make test pass and not witting a sum function itself, that's right! I just followed the 2nd refactoring TDD rule: write only the necessary code to make the test pass!

Obviously it doesn't guarantees the problem solving, because if we use `sum(1, 0)` it will fails because it returns `5` anyway. The TDD response for this is: write another test for every doubt you have about if your code is meeting all the problem requirements. So we'll write another test:

{% highlight javascript %}
//test method
function onePlusZeroShouldBeOne(){
  var result = sum(1,0)
  assert(result, 1)
}
{% endhighlight %}

Now tests will fail again since result is returning `5` instead `1`.

Have you noticed the 3 TDD rules happening?

1. We wrote a test and it failed

2. We wrote the code

3. Tests passed, but as it not meets all requirements, so we wrote another test and it's failing going to 1st rule again.


Since we wrote a new test and it's failing like 1st rule, now we go to 2nd rule refactoring: we will refactor`sum()` function to make all test pass:

{% highlight javascript %}
function sum(number1, number2){
  return number1 + number2
}
{% endhighlight %}

Now tests are passing, and we accomplished rule 3 one more time. That's it, we solved the problem with TDD.

## This is boring, why not write the correct code at first?

Because we are humans and we make wrong assumptions. It was a minimal example, but writing code for complex problems, going fast-paced can lead you forget to attend some requirement or write too much code for the solution.

Programmers expend more time reading and debugging than writing code. Beyond TDD helping to write better code, in the end you'll have tests ensuring that your code is right, preventing future breaking changes. That's why TDD is wide used.

## How many tests you need to write?

Obviously you don't need to write tests for every input (1+0, 1+1, 1+2, 1+3..), just write the enough to feel comfortable that you're meeting all the problem requirements. With experience you'll decide how many tests to write, and write fewer tests that cover all requirements. But until you don't get comfortable, write many tests as you want, that's how you'll learn.

That's all, feel free ask me any question.