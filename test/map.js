var should = require('should');
var LazySeq = require('../index');


var data1 = [1,2,3,4,5,6,7,8,9,0];
var data2 = [1,2,3];

describe('map', function() {

  it('map', function() {
    var seq = new LazySeq([data1, data2]);
    seq.map(function map(item, next) {
      next(item[0] + item[1]);
    });

    seq.next().should.equal(2);
    //seq.take(2).should.eql([])
  })


})