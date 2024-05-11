+++
title = 'On your Mark(down)! Go!'
description = 'Show rendering of Markdown constructs.'
author = 'Brieuc Desoutter'
date = 2024-05-08T10:35:53+03:00
draft = true
+++

# On your mark(down)s! Go!

This document demonstrates how ~~all~~ most markdown constructs are rendered.  

## Headings

All headings are visually separated from the content above.  
Headings 1, 2 and 3 are rendered in bold.  
Headings 4, 5, and 6 are rendered in normal text.

## Paragraphs (header 2)

Separate paragraphs with a blank line.

Like this.

For line breaks.  
End a line with 2 or more whitespaces and then return.

## Basic Text Style

### Emphasis (Header 3)

Emphasis brings extra attention to some words.

#### Italic (Header 4)

Use `*` or `_` around word to *italicize* them.

But avoid using `_` in the middle of words as it can confuse some markdown processors.

#### Bold

Surround words with `**` to put word in **bold**.

#### Italic and Bold

You can also use ***bold and italic***! Crazy huh?

### Inline Code

We used ```code``` to include some `inline code` too from time to time.

## Blockquote

One day I said this:
> Do or do not. There is not try!

No actually I didn't say that. someone else did... Sorry.

## Lists

### Ordered lists

Step to get rich:
1. Study
2. Get a job
3. Work hard
4. You're done... or are you?

#### Nested Ordered lists

Alternate plan:
1. Study
2. Make money
  a. Working
  b. Or winning the lottery
3. You're almost done

### Unordered lists

Things you need in life:
- Sea
- Sex
- Sun

#### Nested Unordered lists

- Pff
- I run out 
  - of idea
  - of money
- for list

### List with extra elements

To add another element in a list while preserving the continuity of the list, indent the element 4 spaces or one tab:

1. Step 1

    > The first step is always the hardest one!

2. Step 2

    Although step 2 is also hard

3. Step 3 though is easy

## Code

Say hello to my favorite language!
```rust {lineNos=true}
fn hello() {
  println!("Hello World!");
}
```

## Links

My favorite programming language is [rust](https://rust-lang.org).

### URL and emails

You can use <https://lemonde.fr> and <john.doe@gmail.com> directly.

### References links

This can be useful too.

```
My favorite programming language is [rust][1]. Didn't you know?
...
[1]:<https://rust-lang.org>
```

## Images

Images are included as follows:
```
![alt_text](link "optional title")
```


## Tables

What about tables? You're asking!

Here is one:
| Header 1 | Header 2 | Heading 3 |
|:---------|:--------:|----------:|
| Key      | Value    |  123      |

**Table 1:** Intersting data, huh.

