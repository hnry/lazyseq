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
    
    var counter = 2; // did 2 earlier ^
    
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

  it('take', function() {
    var seq = new LazySeq({ 'x': data1, 'y': data2 }); 
    seq.next().should.eql({ 'x': 1, 'y': 'a' });
    seq.take(1);
    seq.next().should.eql({ 'x': 1, 'y': 'c' });
    seq.take(5).should.eql([
      { x: 2, y: 'a' },
      { x: 2, y: 'b' },
      { x: 2, y: 'c' },
      { x: 3, y: 'a' },
      { x: 3, y: 'b' }
    ]);
    seq.next().should.eql({ 'x': 3, 'y': 'c' });
  })

  it('skip', function() {
    var seq = new LazySeq({ 'x': data1, 'y': data2 }); 
    seq.skip(data1.length * data2.length);
    should.not.exist(seq.next());
    seq._done.should.be.ok;
  })

  it('random')

  it('unique random')

})