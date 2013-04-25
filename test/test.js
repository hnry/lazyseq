var should = require('should');
var LazySeq = require('../index');


var data1 = [1,2,3,4,5,6,7,8,9,0];
var data2 = ['a', 'b', 'c'];

describe('lazyseq', function() {

  it('accepts an object', function() {
    var seq = new LazySeq({ 'data1': data1, 'data2': data2 });

    seq.next().should.eql({ 'data1': 1, 'data2': 'a' });
    seq.next().should.eql({ 'data1': 1, 'data2': 'b' });
    seq.next().should.eql({ 'data1': 1, 'data2': 'c' });
    seq.next().should.eql({ 'data1': 2, 'data2': 'a' });

  })

  it('accepts multi-dimensional array', function() {
    var seq = new LazySeq([data1, data2]);

    seq.next().should.eql([1, 'a']);
    seq.next().should.eql([1, 'b']);
    seq.next().should.eql([1, 'c']);
    seq.next().should.eql([2, 'a']);
    //Array.isArray(seq.next()).should.be.ok;
  })

  it('complete sequence', function() {
    var seq = new LazySeq({ 'x': data1, 'y': data2 }); 
    seq.next().should.eql({ 'x': 1, 'y': 'a' });
    seq.next().should.eql({ 'x': 1, 'y': 'b' });
    var counter = 2;
    while (seq.next()) {
      counter++;
    }
    counter.should.equal(data1.length * data2.length);
  })

  it('reset sequence', function() {
    var seq = new LazySeq({ 'x': data1, 'y': data2 }); 
    seq.next().should.eql({ 'x': 1, 'y': 'a' });
    seq.next().should.eql({ 'x': 1, 'y': 'b' });
    seq.next().should.eql({ 'x': 1, 'y': 'c' });
    seq.reset();
    seq.next().should.eql({ 'x': 1, 'y': 'a' });
  })

  it('minimum')

  it('ordering')

  it('take')

  it('skip')

  it('random')

  it('unique random')

})