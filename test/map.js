var should = require('should');
var LazySeq = require('../index');


var data1 = [1,2,3,4,5,6,7,8,9,0];
var data2 = ['a', 'b', 'c'];

describe('map', function() {

  it('next', function() {
    var seq = new LazySeq({ 'x': data1, 'y': data2 })
              .map(function(item, done) {
                done(item.x + item.y);
              });

    seq.next().should.eql('1a');
    seq.next().should.eql('2b');
    seq.next().should.eql('3c');
  })

  it.skip('complete sequence', function() {
    var seq = new LazySeq({ 'x': data1, 'y': data2 }).map(); 
    seq.next().should.eql({ x: 1 });
    seq.next().should.eql({ y: 'a' });
    
    //var counter = 2; // did 2 earlier ^
    
    //while (seq.next()) {
    //  counter++;
    //}
    //counter.should.equal(data1.length * data2.length);
  })

  it.skip('reset sequence', function() {
    var seq = new LazySeq({ y: data2, x: data1 }).map();
    seq.next().should.eql({ 'x': 1, 'y': 'a' });
    seq.next().should.eql({ 'x': 1, 'y': 'b' });
    seq.next().should.eql({ 'x': 1, 'y': 'c' });
    seq.reset();
    seq.next().should.eql({ 'x': 1, 'y': 'a' });
  })

  // ordering is based on first specified
  it.skip('priority ordering', function() {
    var seq = new LazySeq({ 'a': data1, 'z': data2 }).map();
    seq.next().should.eql({ 'a': 1, 'z': 'a' });
    seq.next().should.eql({ 'a': 2, 'z': 'a' });

    var seq = new LazySeq({ 'z': data1, 'a': data2 }).map();
    seq.next().should.eql({ 'z': 1, 'a': 'a' });
    seq.next().should.eql({ 'z': 2, 'a': 'a' });

    var seq = new LazySeq([data1, data2]).map();
    seq.next().should.eql([1, 'a']);
    seq.next().should.eql([2, 'a']);
  })

  it.skip('take', function() {
    var seq = new LazySeq({ 'x': data1, 'y': data2 }).map(); 
    seq.next().should.eql({ 'x': 1, 'y': 'a' });
    seq.take(1);
    seq.next().should.eql({ 'x': 3, 'y': 'a' });
    seq.take(5).should.eql([
      { x: 4, y: 'a' },
      { x: 5, y: 'a' },
      { x: 6, y: 'a' },
      { x: 7, y: 'a' },
      { x: 8, y: 'a' }
    ]);
    seq.next().should.eql({ 'x': 9, 'y': 'a' });
  })


  it.skip('length', function() {
    var seq = new LazySeq({ x: data1, y: data2 }).map(); 
    seq.length.should.equal(Infinity);
  })

})