# A simple diceware module
[![CircleCI](https://circleci.com/gh/JacksonKearl/family-friendly-diceware.svg?style=svg)](https://circleci.com/gh/JacksonKearl/family-friendly-diceware)


`diceware` generates passphrase using the the EFF's [family friendly diceware list](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases).

It's worth noting that [it's not recommended](http://world.std.com/~reinhold/dicewarefaq.html#electronic) to use a computer to generate a Diceware phrase. This package is in fact intended for easy to distribute UUID's, so we have also provided some additional backwards functionality.

As this is meant to be use with user input, attempts to normalize and correct obvious errors are made. In the future we may attempt to use EFF's simplified word list with edit distance guarantees in order to provide more intelligent corrections.

```
    npm install family-friendly-diceware
```

```
    diceware = require('family-friendly-diceware');

    diceware.make_phrase_with_id()
    > { phrase: 'turtle astride porous', id: '286370444755' }

    diceware.id_to_phrase('286370444755')
    > 'turtle astride porous'

    diceware.phrase_to_id('turtle astride porous')
    > '286370444755'

    diceware.phrase_to_id('  turtle AStride    porous  ') // we make an attempt to normalize, actual correction possibly to come
    > '286370444755'
```
