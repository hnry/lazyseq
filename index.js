module.exports = function(data) {
  var akeys;
  if (!Array.isArray(data)) {
    akeys = Object.keys(data);
  }

  var idx = [];
  var len = [];
  var alen = akeys.length;

  for (var i = 0; i < alen; i++) {
    idx.push(0);
    len.push(data[akeys[i]].length);
  }

  var init = true;
  return function() {
    if (init) {
      // first run
      init = false;
    } else {
      // bump counter
      for (var i = alen; i > 0; i--) {
        if (idx[i - 1] < (len[i - 1] - 1)) {
          idx[i - 1]++;
          break;
        } else {
          idx[i - 1] = 0;
        }
      }
    }
    var retObj = {};
    for (var i = 0; i < alen; i++) {
      retObj[akeys[i]] = data[akeys[i]][idx[i]];
    }
    return retObj;
  }
}