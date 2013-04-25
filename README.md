[![Build Status](https://travis-ci.org/lovebear/lazyseq.png)](https://travis-ci.org/lovebear/lazyseq)

## A multi-dimensional lazy sequence generator...

For node.js or browser


```js
var datasets = { 'c': ['a', 'b', 'c'], 'a': [1,2,3,4], 'b': [1,2,3,4] };

var LazySeq = require('lazyseq');

var seq = new LazySeq(datasets);

seq.next(); // { 'a': 1, 'b': 1, 'c': 'a' }
seq.next(); // { 'a': 1, 'b': 1, 'c': 'b' }
seq.next(); // { 'a': 1, 'b': 1, 'c': 'c' }
seq.next(); // { 'a': 2, 'b': 1, 'c': 'a' }
seq.next(); // { 'a': 2, 'b': 1, 'c': 'b' }

seq.take(5); // returns array of next 5 in the sequence

seq.skip(5); // skip next 5

// etc...

```

Notice the ordering of the sequence is related to the order of the dataset being passed in.

Priority is in the order defined ( c, then a, then b ).


##### next

Returns the next data in the sequence

##### take (*n*)

Returns the next *n* data in the sequence

##### skip (*n*)

Just an alias of take(*n) but does not return anything

