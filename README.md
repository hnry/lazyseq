[![Build Status](https://travis-ci.org/lovebear/lazyseq.png)](https://travis-ci.org/lovebear/lazyseq)

# lazy sequence (multi-dimensional capable) mapreduce / generator

For node.js or browser


```js
var datasets = { 'c': ['a', 'b', 'c'], 'a': [1,2,3,4], 'b': [1,2,3,4] };

var LazySeq = require('lazyseq');

var seq = new LazySeq(datasets).cartesian();

seq.next(); // { 'a': 1, 'b': 1, 'c': 'a' }
seq.next(); // { 'a': 1, 'b': 1, 'c': 'b' }
seq.next(); // { 'a': 1, 'b': 1, 'c': 'c' }
seq.next(); // { 'a': 2, 'b': 1, 'c': 'a' }
seq.next(); // { 'a': 2, 'b': 1, 'c': 'b' }

seq.take(5); // returns array of next 5 in the sequence
```

Notice the ordering of the sequence is related to the order of the dataset being passed in.

Priority is in the order defined ( c, then a, then b ).

## Generators

#### cartesian

(Example shown above)

#### map (fn)

```js
var seq = new LazySeq(datasets)
              .map(function(item) {
                return item.a + item.b + item.c;
              });

seq.next(); // '11a'
seq.next(); // '22b'
seq.next(); // '33c'
```

#### reduce (fn)

```js
var seq = new LazySeq(datasets)
              .reduce(function(prev, curr) {
                // first run
                if (prev.a) {
                  return prev.a + curr.a;
                } else {
                  return prev + curr.b;
                }
              });

seq.next(); // 3  // first run: 1 + 2
seq.next(); // 4  // 3 + 1
seq.next(); // 6  // 4 + 2
```

#### filter -- TODO

#### interleave -- TODO


## Generator API

All generators share the same API, which is:

##### next

Returns the next data in the sequence

##### take (*n*)

Returns the next *n* data in the sequence

##### reset

Resets the generator back to the beginning

