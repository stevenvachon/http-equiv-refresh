"use strict";
var pattern = /^(\d+)(?:;(?:\s*url\s*=\s*)?(.+)?)?$/i;



function parseMetaRefresh(content)
{
	var result = { timeout:null, url:null };
	content = pattern.exec(content);
	
	if (content !== null)
	{
		if (content[1] !== undefined) result.timeout = content[1] * 1;  // faster than `parseInt()`
		if (content[2] !== undefined) result.url     = content[2].trim();
	}
	
	return result;
}



module.exports = parseMetaRefresh;
