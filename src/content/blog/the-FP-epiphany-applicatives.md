---
title: 'The FP Epiphany - Applicatives'
description: 'A serie about learning functional programming. This post is about applicative functors.'
pubDate: 'Oct 11 2024'
---

In a previous [post](/blog/the-fp-epiphany-functors/), we learned about functors and how they allow us to apply/map
a function taking a **single** argument over a *functorial* structure, eg a list, a Maybe or Either...

One way to look at ***applicative functors*** exposed by Graham Hutton in his book [Programming Haskell](...) 
is as a generalization of functors to pure functions with multiple arguments. 

Indeed functors give us:

```haskell
fmap :: functor f => (a -> b) -> f a -> f b
```

But what if the function you want to map takes more than one argument?

You would think that currying would help and that you could repeatedly use `fmap`:

```haskell
f :: a -> b -> c 
f = ...

curried_f = fmap f (Just a)
fully_applied = fmap curried_f (Just b)
...
```

Unfortunately this does not typecheck. Indeed the type of `curried_f` above is `Maybe (b -> c)` (our partially applied function wrapped into a `Maybe`).
But the 2nd `fmap` application requires `b -> c`.

Instead, we could define a whole bunch of functions to apply functions of 2, 3, ..., N arguments to wrapped arguments as follow:

```haskell
fmap2 :: (a -> b -> c) -> f a -> f b -> f c -- 
fmap3 :: (a -> b -> c -> d) -> f a -> f b -> f c -> f d
...
```

But that wouldn't be very practical. How many of these would you need ? 2 ? 3 ? One hundred ?!

## Applicative to the rescue!

With ***applicative*** we can define all these functions with only 2 simple functions. How you would ask?

Well, let's pursue our first intuition about currying. The problem is that partially applying a N-ary function (N > 1) using `fmap` 
gives us back a partially applied function wrapped in a functor, which stop us from further using `fmap` with the remaining arguments as we have seen above.
But if we could apply a wrapped function to a wrapped argument, this would allow us to further apply the function to the remaining arguments.

So if we had something like:

```haskell
(<*>) :: f (a -> b) -> f a -> f b
```

We could rewrite our example above as: 

```haskell
f :: a -> b -> c 
f = ...

curried_f = fmap f (Just a)
fully_applied =  curried_f <*> (Just b)
...
```

And this could be generalized to any number of arguments. Then our `fmap2`, `fmap3`... functions would be defined as:

```haskell
fmap :: (a -> b) -> f a -> f b

fmap2 :: (a -> b -> c) -> f a -> f b -> f c -- 
fmap2 f fa fb = fmap f fa <*> fb

fmap3 :: (a -> b -> c -> d) -> f a -> f b -> f c -> f d
fmap3 f fa fb fc = fmap f fa <*> fb <*> fc
...
```

We mentioned 2 simple functions and we have only talked about `<*>`. Well the 2nd function is called `pure` and 
is somehow a way to *bootstrap* the pyramid of `fmapN` functions:

```haskell
pure :: a -> f a

fmap :: (a -> b) -> f a -> f b
fmap f fa = pure f <*> fa

fmap2 :: (a -> b -> c) -> f a -> f b -> f c
fmap2 f fa fb = pure f <*> fa <*> fa
...
```

And there you have it! 

An ***applicative functor*** is a functor with an `Applicative` instance, where `Applicative` is 
the following class:

```haskell
class Functor f => Applicative f where
  pure :: a -> f a
  (<*>) :: f (a -> b) -> f a -> f b
```

and whose instance obeys the following laws:

```haskell
pure id <*> x = x
pure (.) <*> u <*> v <*> w = u <*> (v <*> w)
pure f <*> pure x = pure (f x)
u <*> pure x = pure (\f -> f x) <*> u
```

## Show me some examples!

Our first example of applicative functor is `Maybe`:

```haskell
ghci> pure (+) <*> Just 1 <*> Just 2
Just 3
ghci> pure (+) <*> Nothing <*> Just 2
Nothing
ghci> pure (+) <*> Just 1 <*> Nothing 
Nothing
```

So using `Applicative` we can lift a pure total function to operate on arguments *which may fail*, and turn it into 
a function which may fail if evaluation, although this function must now be apply using the special applicative function 
application operator `<*>`.

The second example is the `[]` and it is a little bit less intuitive:

```haskell
ghci> pure (+) <*> [1, 2, 3] <*> [4, 5, 6]
[5, 6, 7, 6, 7, 8, 7, 8, 9]
```

So what it does is lift a pure function taking (normal) single value arguments and returning a single value 
into a function taking some sort of multi-valued arguments (in the form of a list of values) and returning a *multi-value* containing 
the result of the original function applied to every pairs of single values from the mutli-valued arguments.

So using the list applicative we can get some sort of non-deterministic function.

But that is only one way to define an applicative instance for `[]` and contrary to `Functor` there are more than 
one way to define a valid `Applicative` instance for ***polymorphic type***. We might want to apply the `(+)` function pairwise, i.e. 
to the first values in the argument lists, and then to the 2nd values, and so on... 

Just as for the multiple `Monoid` instances of numerical types, we can define that `Applicative` instance on a newtype.

```haskell
ghci> pure (+) <*> ZipList [1, 2, 3] <*> ZipList [4, 5, 6]
ZipList {getZipList = [5, 7, 9]}
```

## Are Applicative stacked like Functors ? 

In the previous [post](/blog/the-fp-epiphany-functors/) about `Functor`, I mentioned that `Functor`s are stacked.
That is you can `fmap` a function at any *depth* in a stack of `Functor` by composing `fmap`, for instance:

```haskell
ghci> (fmap . fmap) (+1) [Just 1, Just 2]
[Jsut 2, Just 3]
```

What if I want to add elements from lists of `Maybe Integer`? 

```haskell
ghci> pure ??? <*> [Just 1, Just 2] <*> [Nothing, Just 3]
```

Which value shall I pass to the `pure` function above? 

We need a function of type `Maybe Integer -> Maybe Integer -> Maybe Integer`.

Do you remember our `fmap2` above? Its type was:

```haskell
fmap2 :: Applicative f => (a -> b -> c) -> f a -> f b -> f c
```

So if we partially apply it to the `(+)` function, we get what we need in return: 

```haskell
(+) :: Num a => a -> a -> a
fmap2 (+) :: (Applicative f, Num a) => f a -> f a -> f a
```

It turns out that `fmap2` is provided to you by Haskell under the name `liftA2` in `Control.Applicative`:

```haskell
ghci> pure (liftA2 (+)) <*> [Just 1, Just 2] <*> [Nothing, Just 3]
[Nothing, Just 4, Nothing, Just 5]
```

Which can be rewritten a bit nicer using `<$>`:

```haskell
ghci> liftA2 (+) <$> [Just 1, Just 2] <*> [Nothing, Just 3]
[Nothing, Just 4, Nothing, Just 5]
```

