"use strict";
var parseMetaRefresh = require("./");

var expect = require("chai").expect;



it("should work", function()
{
	var nothing        = { timeout:null, url:null };
	var timeoutAndUrl1 = { timeout:5, url:"http://domain.com/" };
	var timeoutAndUrl2 = { timeout:5, url:"url" };
	var timeoutAndUrl3 = { timeout:5, url:"http://domain.com/;" };
	var timeoutOnly    = { timeout:5, url:null };
	
	expect( parseMetaRefresh(null)                        ).to.deep.equal(nothing);
	expect( parseMetaRefresh("")                          ).to.deep.equal(nothing);
	expect( parseMetaRefresh(" ")                         ).to.deep.equal(nothing);
	expect( parseMetaRefresh("5")                         ).to.deep.equal(timeoutOnly);
	expect( parseMetaRefresh("5;")                        ).to.deep.equal(timeoutOnly);
	expect( parseMetaRefresh("5;url")                     ).to.deep.equal(timeoutAndUrl2);
	expect( parseMetaRefresh("5;url=http://domain.com/")  ).to.deep.equal(timeoutAndUrl1);
	expect( parseMetaRefresh("5;http://domain.com/")      ).to.deep.equal(timeoutAndUrl1);
	expect( parseMetaRefresh("5; url")                    ).to.deep.equal(timeoutAndUrl2);
	expect( parseMetaRefresh("5; url=")                   ).to.deep.equal(timeoutOnly);
	expect( parseMetaRefresh("5; url=http://domain.com/") ).to.deep.equal(timeoutAndUrl1);
	expect( parseMetaRefresh("5; http://domain.com/")     ).to.deep.equal(timeoutAndUrl1);
	expect( parseMetaRefresh(";")                         ).to.deep.equal(nothing);
	expect( parseMetaRefresh(";url")                      ).to.deep.equal(nothing);
	expect( parseMetaRefresh(";url=")                     ).to.deep.equal(nothing);
	expect( parseMetaRefresh(";url=http://domain.com/")   ).to.deep.equal(nothing);
	expect( parseMetaRefresh(";http://domain.com/")       ).to.deep.equal(nothing);
	expect( parseMetaRefresh("url")                       ).to.deep.equal(nothing);
	expect( parseMetaRefresh("url=")                      ).to.deep.equal(nothing);
	expect( parseMetaRefresh("url=http://domain.com/")    ).to.deep.equal(nothing);
	expect( parseMetaRefresh("=http://domain.com/")       ).to.deep.equal(nothing);
	expect( parseMetaRefresh("http://domain.com/")        ).to.deep.equal(nothing);
	
	expect( parseMetaRefresh("5; URL=http://domain.com/") ).to.deep.equal(timeoutAndUrl1);
	
	expect( parseMetaRefresh("5; url= http://domain.com/ ")  ).to.deep.equal(timeoutAndUrl1);
	expect( parseMetaRefresh("5; url = http://domain.com/ ") ).to.deep.equal(timeoutAndUrl1);
	expect( parseMetaRefresh("5; url = ")                    ).to.deep.equal(timeoutOnly);
	expect( parseMetaRefresh("5; url= ")                     ).to.deep.equal(timeoutOnly);
	
	expect( parseMetaRefresh(" 5;  url =  http://domain.com/ ") ).to.deep.equal(timeoutAndUrl1);
	
	expect( parseMetaRefresh("-5; url=http://domain.com/") ).to.deep.equal(nothing);
	
	expect( parseMetaRefresh("5; url=http://domain.com/;")   ).to.deep.equal(timeoutAndUrl3);
	expect( parseMetaRefresh("5; url=http://domain.com/; ")  ).to.deep.equal(timeoutAndUrl3);
	expect( parseMetaRefresh("5;URL='http://domain.com/'")  ).to.deep.equal(timeoutAndUrl3);	// as see on Google Alerts
	expect( parseMetaRefresh("5; url=http://domain.com/ ; ") ).to.deep.equal({ timeout:5, url:"http://domain.com/ ;" });
});
