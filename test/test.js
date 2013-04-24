var should = require('should');
var sequencer = require('../index');

describe('sequencer', function() {

  it('generates', function() {
    var sample1 = [1,2,3,4,5,6,7,8,9,0];
    var sample2 = ['a', 'b', 'c'];

    var seq = sequencer({ 'sample1': sample1, 'sample2': sample2 });

    seq().should.eql({ 'sample1': 1, 'sample2': 'a' });
    seq().should.eql({ 'sample1': 1, 'sample2': 'b' });
    seq().should.eql({ 'sample1': 1, 'sample2': 'c' });
    seq().should.eql({ 'sample1': 2, 'sample2': 'a' });
    seq().should.eql({ 'sample1': 2, 'sample2': 'b' });
    seq().should.eql({ 'sample1': 2, 'sample2': 'c' });
    seq().should.eql({ 'sample1': 3, 'sample2': 'a' });

  })

})