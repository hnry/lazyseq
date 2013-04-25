function LazyGenerator(data, opts) {
  this.data = data;

  this._akeys = Object.keys(this.data);

  this._idx = [];
  this._len = [];
  this.alen = this._akeys.length;

  for (var i = 0; i < this.alen; i++) {
    this._idx.push(0);
    this._len.push(this.data[this._akeys[i]].length);
  }

  this._init = true;
  this._done = false;
}

LazyGenerator.prototype.random = function() {
  return undefined;
};

LazyGenerator.prototype.skip = function(n) {
  return undefined;
};

LazyGenerator.prototype.take = function(n) {
  return undefined;
};

LazyGenerator.prototype.reset = function() {
  for (var i = 0, l = this._idx.length; i < l; i++)
    this._idx[i] = 0;
  this._done = false;
  this._init = true;
};

LazyGenerator.prototype._adjustIdx = function() {
  for (var i = this.alen; i > 0; i--) {
    if (this._idx[i - 1] < (this._len[i - 1] - 1)) {
      this._idx[i - 1]++;
      break;
    } else {
      this._idx[i - 1] = 0;
      if (i == 1) this._done = true;
    }
  }
};

LazyGenerator.prototype.next = function() {
    if (this._init) {
      this._init = false;
    } else {
      this._adjustIdx();
    }
    
    if (this._done) return undefined;

    var retObj = {};
    for (var i = 0; i < this.alen; i++) {
      retObj[this._akeys[i]] = this.data[this._akeys[i]][this._idx[i]];
    }
    return retObj;
};

if (module && module.exports) module.exports = LazyGenerator;
