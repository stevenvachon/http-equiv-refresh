"use strict";
const pattern = /^\s*(\d+)(?:\s*;(?:\s*url\s*=)?\s*(?:("|')\s*(.+?)?\s*\2|(.+?))?)?\s*$/i;



const parseMetaRefresh = content =>
{
	const result = { timeout:null, url:null };
	content = pattern.exec(content);

	if (content !== null)
	{
		// pattern gaurantees first matching group
		result.timeout = parseInt( content[1] );

		result.url = content[3] || content[4] || null;
	}

	return result;
};



module.exports = parseMetaRefresh;
