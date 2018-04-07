var expect = require('chai').expect;
var validator = require('./index');

describe('gstin-validator', function() {
  it('isValidGSTNumber::Should return false when length is not 15 digits', function() {
    var result = validator.isValidGSTNumber('123412341234');
    expect(result).to.be.false;
  });

  it('isValidGSTNumber::Should return false if 15 digit non regex matching GSTIN is validated', function() {
    var result = validator.isValidGSTNumber('47AAGCG4576J1A6');
    expect(result).to.be.false;
  });

  it('isValidGSTNumber::Should return false if 15 digit valid regex matching GSTIN with incorrect checksum is validated', function() {
    var result = validator.isValidGSTNumber('27AAGCG4576J1Z8');
    expect(result).to.be.false;
  });

  it('isValidGSTNumber::Should return true if valid 15 digit GSTIN is passed', function() {
    var result = validator.isValidGSTNumber('27AAGCG4576J1Z6'); // Google India
    expect(result).to.be.true;
  });

  it('isValidGSTNumber::Should return true for GSTIN of Indian Oil across all states', function() {
    var gstins = ['37AAACI1681G2ZN', '35AAACI1681G1ZS', '12AAACI1681G1Z0', '18AAACI1681G1ZO', '10AAACI1681G1Z4', '04AAACI1681G1ZX', '22AAACI1681G1ZZ', '26AAACI1681G1ZR', '25AAACI1681G1ZT', '07AAACI1681G1ZR', '30AAACI1681G1Z2', '24AAACI1681G1ZV', '06AAACI1681G1ZT', '02AAACI1681G3ZZ', '01AAACI1681G2Z2', '20AAACI1681G3Z1', '29AAACI1681G1ZL', '32AAACI1681G1ZY', '23AAACI1681G1ZX', '27AAACI1681G1ZP', '14AAACI1681G2ZV', '17AAACI1681G1ZQ', '15AAACI1681G1ZU', '13AAACI1681G1ZY', '21AAACI1681G1Z1', '34AAACI1681G1ZU', '03AAACI1681G1ZZ', '08AAACI1681G2ZO', '11AAACI1681G1Z2', '33AAACI1681G1ZW', '36AAACI1681G1ZQ', '16AAACI1681G1ZS', '09AAACI1681G1ZN', '05AAACI1681G1ZV', '19AAACI1681G1ZM', '06AAACI1681G2ZS', '24AAACI1681G2ZU']; // GSTIN of Indian Oil across all states.
    var success = true;
    for (var gstin in gstins) {
      var result = validator.isValidGSTNumber(gstins[gstin]);
      success = success && result;
    }
    expect(success).to.be.true;
  });

  it('ValidateGSTIN::Should return Enter a valid 15 character GSTIN when length is not 15 digits', function() {
    var result = validator.ValidateGSTIN('123412341234');
    expect((result == 'Enter a valid 15 character GSTIN')).to.be.true;
  });

  it('ValidateGSTIN::Should return Invalid GSTIN format if 15 digit non regex matching GSTIN is validated', function() {
    var result = validator.ValidateGSTIN('47AAGCG4576J1A6');
    expect((result == 'Invalid GSTIN format')).to.be.true;
  });

  it('ValidateGSTIN::Should return Invalid checksum character in GSTIN if 15 digit valid regex matching GSTIN with incorrect checksum is validated', function() {
    var result = validator.ValidateGSTIN('25AAACI1681G1Z4');
    expect((result == 'Invalid checksum character in GSTIN')).to.be.true;
  });

  it('ValidateGSTIN::Should return true if valid 15 digit GSTIN is passed', function() {
    var result = validator.ValidateGSTIN('27AAGCG4576J1Z6'); // Google India
    expect((result == 'Valid GSTIN')).to.be.true;
  });

  it('get_GSTIN_Info::Should return verbose text for a valid GSTIN', function() {
	 var result = validator.get_GSTIN_Info('27AAGCG4576J1Z6');
	 expect((result == 'The GSTIN 27AAGCG4576J1Z6 is entity #1 belonging to Company whose PAN is AAGCG4576J registered in Maharashtra (MH)')).to.be.true;
  });

  it('get_GSTIN_Info::Should return verbose text for a valid GSTIN of 11th entity of same PAN', function() {
	 var result = validator.get_GSTIN_Info('27AAGCG4576JBZW');
	 expect((result == 'The GSTIN 27AAGCG4576JBZW is entity #11 belonging to Company whose PAN is AAGCG4576J registered in Maharashtra (MH)')).to.be.true;
  });

  it('get_GSTIN_Info::Should return Invalid GSTIN on incorrect GSTIN', function() {
	 var result = validator.get_GSTIN_Info('47AAGCG4576J1Z6');
	 expect((result == 'Invalid GSTIN')).to.be.true;
  });

});
