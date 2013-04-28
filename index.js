function Generator(data, opts, fn) {
  this.data = data;

  if (fn) this.transform = fn;

  this.opts = {
    min: undefined
  }

  if (Array.isArray(this.data)) this._datatype = 'array';
  this._akeys = Object.keys(this.data);
  this._akeys = this._akeys.reverse();

  this._idx = [];
  this._len = [];
  this.alen = this._akeys.length;

  for (var i = 0; i < this.alen; i++) {
    this._idx.push(0);
    this._len.push(this.data[this._akeys[i]].length);
  }

  this._init = true;
  this._done = false;

  this._step = 1; // [reduce]
  this._last = ''; // last computed [reduce]
}

Generator.prototype.take = function(n) {
  var tmp = [], seq;

  for (var i = 0; i < n; i++) {
    seq = this.next();
    if (!seq) break;
    tmp.push(seq);
  }
  return tmp;
};

Generator.prototype.reset = function() {
  for (var i = 0, l = this._idx.length; i < l; i++)
    this._idx[i] = 0;
  this._done = false;
  this._init = true;
};

Generator.prototype._adjustIdx = function() { };
Generator.prototype.transform = function(d) { return d; }

Generator.prototype._stepping = function() {
  if (this._init) {
    this._init = false;
  } else {
    this._adjustIdx();
  }
  
  if (this._done) return undefined;

  var retObj = (this._datatype) ? [] : {};
  for (var i = 0; i < this.alen; i++) {
    retObj[this._akeys[i]] = this.data[this._akeys[i]][this._idx[i]];
  }

  return retObj;
}

/*
 *  _stepping function to support this._step
 *  mainly for [reduce]
 */
Generator.prototype.next = function() {
  if (this._init && this._step === 2) this._last = this._stepping();

 var result = this._stepping();
  if (this._done) return undefined;

  if (this._step === 2) {
    this._last = this.transform(this._last, result);
    return this._last;
  } else {
    return this.transform(result);
  }
};

function LazySeq(data) {
  this.data = data;
}

LazySeq.prototype.cartesian = function(opts) {
  var g = new Generator(this.data, opts);

  g._adjustIdx = function() {
    for (var i = this.alen; i > 0; i--) {
      if (this._idx[i - 1] < (this._len[i - 1] - 1)) {
        this._idx[i - 1]++;
        break;
      } else {
        this._idx[i - 1] = 0;
        if (i == 1) this._done = true;
      }
    }
  }

  g.__defineGetter__('length', function() {
    var l = 0;
    l = this._len.reduce(function(prev, curr) {
      return prev * curr;
    })
    return l;
  });

  return g;
}

LazySeq.prototype.filter = function(fn) {
  var g = new Generator(this.data);

  g._adjustIdx = function() {
    
  }

  return g;
}

LazySeq.prototype.map = function(fn) {
  var g = new Generator(this.data, {}, fn);
  g._adjustIdx = idxMapReduce;
  return g;
}

LazySeq.prototype.reduce = function(fn) {
  var g = new Generator(this.data, {}, fn);
  g._step = 2;
  g._adjustIdx = idxMapReduce;
  return g;
}

LazySeq.prototype.interleave = function() {
  var g = new Generator(this.data);

  g._adjustIdx = function() {

  }

  return g;
}

function idxMapReduce() {
  if (this._done) return;
  for (var i = 0, l = this._idx.length; i < l; i++) {
    if (this._idx[i] === this._len[i] - 1) {
      this._done = true;
      break;
    } else {
      this._idx[i]++;
    }
  }
}

if (typeof module !== 'undefined' && module.exports) module.exports = LazySeq;