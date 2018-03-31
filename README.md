# GSTIN Validator

* Validates GSTIN number for length (15 digits), format (State code, PAN, Entity Number, Z, Checksum) and checksum as per the algorithm published at [GSTN portal](http://developer.gstsystem.co.in/pages/apiportal/data/gsp/download/GSTIN_Validation_SampleCode.zip)

## Installation 

    npm install gstin-validator

## Use

    var validator = require('gstin-validator');
    validator.isValidNumber('12AAACI1681G1Z0');

## Test

    npm test