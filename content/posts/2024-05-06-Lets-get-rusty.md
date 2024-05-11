+++
title = "Let's get rusty!"
description = "Show how code is rendered. Using Rust of course!"
date = 2024-05-06T17:53:34+03:00
draft = true
tags = ['rust']
+++

Rust is system programming language that empowers anyone to write correct, safe and fast programs.  
And that's cool!


## Rust rocks!

First order of business: Install `rustup`:
```bash
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Here is the classic hello world:

1. Create a binary package:

    ```bash
    $ cargo new hello --bin
    ```

1. Edit the `hello/src/main.rs` file to look like this:

    ```rust
    fn main() {
      println!("Hello World!");
    }
    ```

1. And compile and run the program with:

    ```bash
    $ cargo run hello
    ```

Et voila!

