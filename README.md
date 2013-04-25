[![Build Status](https://travis-ci.org/lovebear/lazyseq.png)](https://travis-ci.org/lovebear/lazyseq)

### A multi-dimensional lazy sequence generator...

```js
var data = { 'a': [1,2,3,4], 'b': [1,2,3,4], 'c': ['a', 'b', 'c'] };

var LazySeq = require('lazyseq');

var seq = new LazySeq(data);

seq.next(); // { 'a': 1, 'b': 1, 'c': 'a' }
seq.next(); // { 'a': 1, 'b': 1, 'c': 'b' }
seq.next(); // { 'a': 1, 'b': 1, 'c': 'c' }
seq.next(); // { 'a': 1, 'b': 2, 'c': 'a' }
seq.next(); // { 'a': 1, 'b': 2, 'c': 'b' }

// etc...

```


### todo
- ability to specify different ordering
- minimum
- random
- random unique
- skip
- take
