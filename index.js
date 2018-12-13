"use strict";

/**
 * The Regex used to parse the content attribute.
 * 
 * @constant
 * @type RegExp
 */
const pattern = /^\s*(\d+)(?:\s*;(?:\s*url\s*=)?\s*(?:["']\s*(.*?)\s*['"]|(.*?)))?\s*$/i;

/**
 * Parse the value of the content attribute and return
 * an object containing the timeout and url values, if any.
 * 
 * @param {string} content The value of the content attribute.
 * @returns {object}
 */
const parseMetaRefresh = content =>
{
	const result = { timeout: null, url: null };
	content = pattern.exec( content );

	if( content !== null )
	{
		// pattern gaurantees first matching group
		result.timeout = parseInt( content[ 1 ] );
		result.url     = content[ 2 ] || content[ 3 ] || null;
	}

	return result;
};

module.exports = parseMetaRefresh;
