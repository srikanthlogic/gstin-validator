function calcCheckSum(gstin) {
	"use strict";
	var GSTN_CODEPOINT_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		factor = 2,
		sum = 0,
		checkCodePoint = 0,
		mod = GSTN_CODEPOINT_CHARS.length,
		i;

	for (i = gstin.length - 2; i >= 0; i--) {
		var codePoint = -1;
		for (var j = 0; j < GSTN_CODEPOINT_CHARS.length; j++) {
			if (GSTN_CODEPOINT_CHARS[j] == gstin[i]) {
				codePoint = j;
			}
		}
		var digit = factor * codePoint;
		factor = (factor == 2) ? 1 : 2;
		digit = Math.floor(digit / mod) + (digit % mod);
		sum += digit;
	}
	checkCodePoint = (mod - (sum % mod)) % mod;
	return GSTN_CODEPOINT_CHARS[checkCodePoint];
}

function validate(gstin) {
	"use strict";
	var gstinRegexPattern = /^([0-2][0-9]|[3][0-7])[A-Z]{3}[ABCFGHLJPTK][A-Z]\d{4}[A-Z][A-Z0-9][Z][A-Z0-9]$/;

	if (!gstinRegexPattern.test(gstin)) {//Failed regex GSTIN of 15 digits.
		return false;
	}
	return (gstin.toUpperCase()[14] == calcCheckSum(gstin.toUpperCase()));
}

module.exports = {
	isValidGSTNumber: function (gstin) {
		if (gstin.length != 15) {
			return false;
		}
		return validate(gstin);
	}
	/* TODO 
		getInfo: function(gstin) {
		var states = {};
		var panTypes = [];
	} */
};
