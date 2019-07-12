"use strict";
const {expect} = require("chai");
const {it} = require("mocha");
const parseMetaRefresh = require("./index-es5");



it("works", () =>
{
	const nothing        = { timeout:null, url:null };
	const timeoutAndUrl1 = { timeout:5, url:"http://domain.com/" };
	const timeoutAndUrl2 = { timeout:5, url:"url" };
	const timeoutAndUrl3 = { timeout:5, url:"' http://domain.com/ '" };
	const timeoutAndUrl4 = { timeout:5, url:'" http://domain.com/ "' };
	const timeoutAndUrl5 = { timeout:5, url:"http://domain.com/;" };
	const timeoutOnly    = { timeout:5, url:null };

	expect( parseMetaRefresh(null)                        ).to.deep.equal(nothing);
	expect( parseMetaRefresh("")                          ).to.deep.equal(nothing);
	expect( parseMetaRefresh(" ")                         ).to.deep.equal(nothing);
	expect( parseMetaRefresh("5")                         ).to.deep.equal(timeoutOnly);

	expect( parseMetaRefresh(" 5")                         ).to.deep.equal(timeoutOnly);
	expect( parseMetaRefresh("5 ")                         ).to.deep.equal(timeoutOnly);
	expect( parseMetaRefresh(" 5 ")                        ).to.deep.equal(timeoutOnly);

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

	expect( parseMetaRefresh("5; url='http://domain.com/'")          ).to.deep.equal(timeoutAndUrl1);
	expect( parseMetaRefresh('5; url="http://domain.com/"')          ).to.deep.equal(timeoutAndUrl1);
	expect( parseMetaRefresh("5; url=''http://domain.com/'")         ).to.deep.equal({ timeout:5, url:"'http://domain.com/"  });
	expect( parseMetaRefresh('5; url=""http://domain.com/"')         ).to.deep.equal({ timeout:5, url:'"http://domain.com/'  });
	expect( parseMetaRefresh("5; url='''http://domain.com/'")        ).to.deep.equal({ timeout:5, url:"''http://domain.com/" });
	expect( parseMetaRefresh('5; url="""http://domain.com/"')        ).to.deep.equal({ timeout:5, url:'""http://domain.com/' });
	expect( parseMetaRefresh("5; url=''http://domain.com/''")        ).to.deep.equal({ timeout:5, url:"'http://domain.com/'" });
	expect( parseMetaRefresh('5; url=""http://domain.com/""')        ).to.deep.equal({ timeout:5, url:'"http://domain.com/"' });
	expect( parseMetaRefresh("5; url=''")                            ).to.deep.equal(timeoutOnly);
	expect( parseMetaRefresh('5; url=""')                            ).to.deep.equal(timeoutOnly);
	expect( parseMetaRefresh("5; url = ' http://domain.com/ ' ")     ).to.deep.equal(timeoutAndUrl1);
	expect( parseMetaRefresh('5; url = " http://domain.com/ " ')     ).to.deep.equal(timeoutAndUrl1);
	expect( parseMetaRefresh("5; ' http://domain.com/ ' ")           ).to.deep.equal(timeoutAndUrl1);
	expect( parseMetaRefresh('5; " http://domain.com/ " ')           ).to.deep.equal(timeoutAndUrl1);
	expect( parseMetaRefresh("5; url = ' ' http://domain.com/ ' ' ") ).to.deep.equal(timeoutAndUrl3);
	expect( parseMetaRefresh('5; url = " " http://domain.com/ " " ') ).to.deep.equal(timeoutAndUrl4);
	expect( parseMetaRefresh("5; ' ' http://domain.com/ ' ' ")       ).to.deep.equal(timeoutAndUrl3);
	expect( parseMetaRefresh('5; " " http://domain.com/ " " ')       ).to.deep.equal(timeoutAndUrl4);

	expect( parseMetaRefresh("5; url=http://domain.com/;")   ).to.deep.equal(timeoutAndUrl5);
	expect( parseMetaRefresh("5; url=http://domain.com/; ")  ).to.deep.equal(timeoutAndUrl5);
	expect( parseMetaRefresh("5; url=http://domain.com/ ; ") ).to.deep.equal({ timeout:5, url:"http://domain.com/ ;" });

	expect( parseMetaRefresh(`5; 'http://domain.com/"`) ).to.deep.equal(timeoutAndUrl1);
	expect( parseMetaRefresh(`5; 'http://domai'n.com/"`) ).to.deep.equal({ timeout:5, url:`http://domai'n.com/` });
	expect( parseMetaRefresh(`5; 'http://domai"n.com/"`) ).to.deep.equal({ timeout:5, url:`http://domai"n.com/` });
});
