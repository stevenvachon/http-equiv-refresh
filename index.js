"use strict";
const pattern = /^\s*(\d+)(?:\s*;(?:\s*url\s*=)?\s*(?:["']\s*(.*?)\s*['"]|(.*?)))?\s*$/i;



const parseMetaRefresh = content =>
{
	const result = { timeout:null, url:null };
	content = pattern.exec(content);

	if (content !== null)
	{
		// pattern gaurantees first matching group
		result.timeout = parseInt( content[1] );

		result.url = content[2] || content[3] || null;
	}

	return result;
};



module.exports = parseMetaRefresh;
