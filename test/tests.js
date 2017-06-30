var should = require('should')
var diceware = require('../lib/diceware')

describe('diceware', function () {
  describe('make_phrase', function () {
    it('returns a lowercase string with three words in it', function () {
      var val = diceware.make_phrase();
      val.should.be.an.instanceOf(String);
      val.split(' ').length.should.equal(3);
      val.toLowerCase().should.equal(val);
    })
  })

  describe('make_phrase_with_id', function () {
    it('returns an object with a phrase and an id', function () {
      var val = diceware.make_phrase_with_id();
      val.should.be.an.instanceOf(Object).and.have.property('phrase').which.is.a.String();
      val.should.be.an.instanceOf(Object).and.have.property('id').which.is.a.String();
    })

    it('returns a phrase which maps to the returned id', function () {
      var val = diceware.make_phrase_with_id();
      val.phrase.should.equal(diceware.id_to_phrase(val.id));
    })

    it('returns an id which maps to the returned phrase', function () {
      var val = diceware.make_phrase_with_id();
      val.id.should.equal(diceware.phrase_to_id(val.phrase));
    })
  })

  describe('id_to_phrase', function () {
    it('converts between a string id and the phrase associated', function () {
      var val = diceware.id_to_phrase('286370444755');
      val.should.be.an.instanceOf(String).and.equal('turtle astride porous');
    })

    it('converts between a numeric id and the phrase associated', function () {
      var val = diceware.id_to_phrase(286370444755);
      val.should.be.an.instanceOf(String).and.equal('turtle astride porous');
    })

    it('converts between an empty id and the phrase associated', function () {
      var val = diceware.id_to_phrase();
      val.should.be.an.instanceOf(String).and.equal('');
    })
  })

  describe('phrase_to_id', function () {
    it('converts between a phrase and the id associated', function () {
      var val = diceware.phrase_to_id('turtle astride porous');
      val.should.be.an.instanceOf(String).and.equal('286370444755');
    })

    it('converts between a noisy phrase and the id associated', function () {
      var val = diceware.phrase_to_id('   tUrtLe      astride porouS  ' );
      val.should.be.an.instanceOf(String).and.equal('286370444755');
    })

    it('is able to use the fixer function to correct mistakes in a phrase', function () {
      var val = diceware.phrase_to_id('turtal astride porous', function(str) {
        if (str === "turtal") return 'turtle';
      });
      val.should.be.an.instanceOf(String).and.equal('286370444755');
    })
  })
})
