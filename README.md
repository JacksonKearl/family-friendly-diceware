# A simple diceware module
[![CircleCI](https://circleci.com/gh/JacksonKearl/family-friendly-diceware.svg?style=svg)](https://circleci.com/gh/JacksonKearl/family-friendly-diceware)

`family-friendly-diceware` generates easily sharable ids using the the EFF's [family friendly diceware list](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases).

This package intended for creation of easy to distribute UUID's, so we provide some backwards functionality (phrase to integer index).

As this is meant to be use with user input, attempts to normalize and correct obvious errors are made. For example, `phrase_to_id` begins
with a simple case and spacing normalization, then proceeds to call upon an optional `fixer` function (implemented for example via levenshein distance) to correct for more complex errors.

```
npm install family-friendly-diceware
```

```javascript
diceware = require('family-friendly-diceware');

diceware.make_phrase_with_id()
> { phrase: 'turtle astride porous', id: '286370444755' }

diceware.id_to_phrase('286370444755')
> 'turtle astride porous'

diceware.phrase_to_id('turtle astride porous')
> '286370444755'

diceware.phrase_to_id('  turtle AStride  porous  ')
> '286370444755'

diceware.phrase_to_id('turtal astride porous', function fixer(str) {
  if (str == 'turtal') return 'turtle';
})
> '286370444755'
```

Example fixer (assume `words` is a table containing all words of a give diceware wordlist):
```sql
CREATE OR REPLACE FUNCTION closest_diceware(input_str text) RETURNS text AS
$$
SELECT * FROM words WHERE levenshtein(input_str, word) < 3
                    ORDER BY levenshtein(input_str, word)
                    LIMIT 1;
$$ LANGUAGE SQL;
```
