[![Build Status](https://travis-ci.org/lovebear/lazyseq.png)](https://travis-ci.org/lovebear/lazyseq)

## A multi-dimensional lazy sequence generator...

```js
var datasets = { 'a': [1,2,3,4], 'b': [1,2,3,4], 'c': ['a', 'b', 'c'] };

var LazySeq = require('lazyseq');

var seq = new LazySeq(datasets);

seq.next(); // { 'a': 1, 'b': 1, 'c': 'a' }
seq.next(); // { 'a': 1, 'b': 1, 'c': 'b' }
seq.next(); // { 'a': 1, 'b': 1, 'c': 'c' }
seq.next(); // { 'a': 1, 'b': 2, 'c': 'a' }
seq.next(); // { 'a': 1, 'b': 2, 'c': 'b' }

seq.take(5); // returns array of next 5 in the sequence

seq.skip(5); // skip next 5

// etc...

```

##### next

Returns the next data in the sequence

##### take (*n*)

Returns the next *n* data in the sequence

##### skip (*n*)

Just an alias of take(*n) but does not return anything

