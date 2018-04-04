---
layout: post
title: "SOLID Programming in 10 minutes"
description: "All you should know about SOLID Programming"
date: 2018-04-03
image: /assets/images/solid.jpg
tags: [solid, programming]
comments: true
share: true
---

I'm going to present all you should know about SOLID, with practical examples and personal experiences. SOLID is an acronym for 5 programming design principles to create legible and maintainable code. Let's start with the first one:

## S: Single responsibility

A class (or a function) should have only a single responsibility. Let's take a look at this customer registration class:

```
class CustormerRegistration {
  registerCustomer();
  sendCustomerEmail();
}
```

To check if your class has more than one responsibility, just think:

> "Is there more than one reason for this class be changed in the future?"

If so, probably this class is having more than one responsibility. In the class example above, it could be modified for these 2 reasons:

- Changes in the rules how customer are being registered
- Changes in sending mail (such as SMTP configuration)

To apply Single Responsibility we only need to split different responsibilities into different classes:

```
class MailSender {
  send();
}

class CustormerRegistration {
  registerCustomer() {
    MailSender.send(customerEmail);
  }
}
```

Now each class has only a single responsibility, and it becomes easier to understand the system or find the piece of code which needs to be modified. If you got some problem with sending emails, just go straight to `MailSender`, and only this class needs to be modified!

Of course, this also applies to functions. If you have a large function doing multiple stuff, divide into many functions each doing only one specialized thing.

> In my experience this leads to a lot of classes having only one method being invoked by other classes (public methods) due to single responsibility nature. If you have a class with multiple public methods, this may be a clue of multiple responsibilities.
>
> This is by far the principle you should care most when programming

Benefits:
- The software code became easier to read and understand.
- Shorter, simpler and specialized classes and functions.
- Direct dependency (coupling) is reduced and clearer.
- Easier to find where code needs to be modified due changes or bugs.

## O: Open-closed

A class should be open to extension but closed for modification. The basic idea is to implement a design which we can add new features without changing the existent code.

A good example is when we have multiple decisions to take:

```
class Notification {
  notify(mode) {
    if(mode == 'SMS'){
      doSmsLogic()
    }

    if(mode == 'Email') {
      doEmailLogic()
    }
  }
}

Notification.notify('Email')
```

What happens if we need to also notify via `Mobile`? This will require changing the existent code, so let's refactor this to be extensible instead:

```
class SMS {
  doNotificationLogic()
}

class Email {
  doNotificationLogic()
}

class Notification {
  notify(mode) {
    mode.doNotificationLogic()
  }
}

Notification.notify(Email)
```

Now if we want to notify via `Mobile`, we just need to create a `Mobile` class with a `doLogic()` method, without touching the existent code!

> Do we need always to apply this principle?
>
> No, as you can see the code became extensible but more complex as well, while you are not sure there will be modifications, don't try to predict the future and stay simple. If many modifications start to happen, then you apply this concept and the complexity trade-off will be worth it.



Benefits:

- The code can be more maintainable and reusable.

## L: Liskov Substituition

Objects should be replaceable by instances of their subtypes without changing the behavior.

Let's take a look at `Order` class and its subtype `SpecialOrder`:

```
class Order {
  sendProduct() {
    this.hasProductSent = true
  }
}

class SpecialOrder {
  sendProduct() {
    if(this.isSpecialClient) {
      this.hasProductSent = true
    }
  }
}
```

Basically this principle tell us if we invoke `SpecialOrder.sendProduct()` instead `Order.sendProduct()` the behavior of the program shouldn't be affected , and as you can see the subtype `SpecialOrder` doesn't guarantee `this.hasProductSent` will be always true.

More than code, this principle is about behavior contract. If an object has a function to send a product, the subtypes should do the same. If your subtypes have more conditions then your parent class, you are violating this principle. So let's refactor to apply Liskov Substitution Principle:

```
class Order {
  canSendOrder() {
    return true
  }

  tryToSendTheProduct() {
    if(this.canSendOrder()){
      this.hasProductSent = true
    }
  }
}

class SpecialOrder {
  canSendOrder() {
    return this.isSpecialClient
  }

  tryToSendTheProduct() {
    if(this.canSendOrder()){
      this.hasProductSent = true
    }
  }
}
```

Now the behavior is the same in both type and subtype. We also changed method the name `sendProduct()` to `tryToSendTheProduct()` only to reinforce the behavior change, and that's the actual contract between classes and subtypes.

In most of the programming languages you can extend subtype by inheritance or interfaces, then you could take advantage and declare `tryToSendTheProduct()` only once on the parent class and reuse on its subtypes, or you can also define an `Order` interface with `NormalOrder` and `SpecialOrder` subtypes.

> This principle helps us to bring to the surface some "hidden surprises" and make the contracts inside your software more comprehensive. Honestly I don't use too much this principle on the first take, some conditions are harmless and it's just OK being there, however this concept is awesome to help us refactor existent code.

Benefits:
- Easier to understand hierarchies or code contracts (interfaces)
- Subtypes behaviors aren't hidden or obscure
- The code may be reusable

## I: Interface Segregation

A class should depend upon only on things it actually needs. Seems just using common sense, right? It is, look at this example:

```
interface Product {
  getDeliveryAddress()
  getTaxes()
}

class InternationalProduct : Product {
  getDeliveryAddress() {
    return "International St."
  }

  getTaxes () {
    return "$ 3.20"
  }
}

class NationalProduct : Product {
  getDeliveryAddress() {
    return "National St."
  }

  getTaxes () {
    throw new FreeOfTaxesError()
  }
}
```

As we can see, there is no need to `NationalProduct` implements the `getTaxes()` method. It's a problem on the design of the interface. Let's refactor to apply Interface Segregation principle:

```
interface Product {
  getDeliveryAddress()
}

interface Taxable {
  getTaxes()
}

class InternationalProduct : Product, Taxable {
  getDeliveryAddress() {
    return "International St."
  }

  getTaxes () {
    return "$ 3.20"
  }
}

class NationalProduct : Product {
  getDeliveryAddress() {
    return "National St."
  }
}
```

Now each class has implemented what it really needs, and furthermore, we have interfaces which describe better the product attributes.

> This principle seems simple, but it's an important practice in software engineering, doing shorter and specialized things instead huge and inefficient ones. You can bring this concept to databases, micro-services architecture and other areas. If you apply the first principle (Single Responsibility) well, you rarely will have scenarios where you need to segregate interfaces.

Benefits:

- The code is less coupled (dependent)
- Maybe easier to refactor

## D: Dependency Inversion

High-level modules should not depend on low-level modules, they should depend on shared abstractions. Most of our objects don't work alone, they are dependent on other objects to achieve tasks, however, this principle is to minimize the direct dependency. Look at the current code:

```
class Amazon {
  buy() {
    return 'this was bought at Amazon'
  }
}

class PurchaseOrder {
  order() {
    new Amazon().buy()
  }
}
docker build -t pages . &&  docker run --rm --label=github_pages -it -p 127.0.0.1:4000:4000 pages
PurchaseOrder.order()
```

The high-level class `PurchaseOrder` is strict dependent on low-level `Amazon`. Applying the Dependency Inversion principle, this will look like:

```
interface Store {
  buy();
}

class Amazon : Store {
  buy() {
    return 'this was bought at Amazon'
  }
}

class PurchaseOrder {
  order(store) {
    store.buy()
  }
}

PurchaseOrder.buy(new Amazon())
```

Now `PurchaseOrder` is dependent on `Store` interface, not low-level `Amazon` class anymore.

If you already heard about "Dependency Injection", it's an application of this principle, but still different things.

> If you have a direct call in your class to another class consider it a bad-smell in your code. These calls are very obscure and can lead undesired side-effects. Receiving the other classes by parameters it's safe and makes clear what your class depends on. If you don't know *Dependency Injection* yet this should be your next subject to learn.
>
> In the example above, I created a `Store` interface to be required instead requiring the `Amazon` store itself because I'm expecting you can have multiple stores to pass by a parameter to `PurchaseOrder` class. In real-world scenarios, you'll have a lot of dependencies which are strictly dependent on only one class. Many programmers still create an interface for this single dependency class only to argue that "my class is not directly dependent of other class" but in practice, you are only increasing complexity with a useless interface without real gains. If only a single class will be used, you can expect the class itself by the parameter of your dependency injection.

Benefits:

- The code is less coupled (dependent)
- Maybe easier to refactor
