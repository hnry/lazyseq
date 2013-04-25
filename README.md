[![Build Status](https://travis-ci.org/lovebear/lazyseq.png)](https://travis-ci.org/lovebear/lazyseq)

### A multi-dimensional lazy sequence generator...

Basically giving a object:

```js
var data = { 'a': [1,2,3,4], 'b': [1,2,3,4], 'c': ['a', 'b', 'c'] };

var multiarray = require('multiarray');

var generator = multiarray(data);

generator(); // { 'a': 1, 'b': 1, 'c': 'a' }
generator(); // { 'a': 1, 'b': 1, 'c': 'b' }
generator(); // { 'a': 1, 'b': 1, 'c': 'c' }
generator(); // { 'a': 1, 'b': 2, 'c': 'a' }
generator(); // { 'a': 1, 'b': 2, 'c': 'b' }

// etc...

```


### todo
- ability to specify different ordering
- takes array instead of object
- browser support

