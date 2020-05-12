var casper = require('casper').create({
  verbose: true,
  logLevel: "info",
  pageSettings: {
    userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36"
  }
});

var betterDownload = require('casperjs-better-download');

casper.start('https://www.ancestry.com/account/signin?returnUrl=https%3A%2F%2Fwww.ancestry.com', function() {
	this.capture('START.png');
	//LOGIN
	var login="E-MAIL";
	var pass="PASSWORD";
	this.click("body main.page.pageWidthSmall.pagePadded div.ancGrid.mainGrid div.ancCol.ancColRow.w100 section.con.signInOuterCon div.conBody div.ancGrid.ancGridEqual.full480.signInCon div.ancCol.w60.verticalMiddle.paddingLeftLarge div#signInFrameWrp.paddingRightLarge iframe#signInFrame");
	this.page.switchToChildFrame(0);
	this.click('input#username.required.success');
	casper.sendKeys('input#username.required.success', login);
	casper.sendKeys('input#password.required.success', pass);
	this.capture('KEEPSIGNED.png');
	//SIGN IN BUTTON
	this.click('button#signInBtn.ancBtn.lrg');
	casper.wait(3500, function(){
		this.capture('SIGNIN.png');
		//ACCESS ANY LIST (HAMBOURG PASSENGER'S LISTS)
		var i = 0;
		while (i < "FINAL VALUE OF LIST") {
      //HERE REPLACE THIS LINK WITH THE LIST YOU WANT TO DOWNLOAD - IT WORKS BY REPLACING THE LAST NUMERICAL RANGE DEFINER (SEE  sorc0 REPLACING)
			var sorc0 = 'https://www.ancestry.com/interactive/1068/K_1739_080498-0619?pid=2919728&backurl=https://search.ancestry.com/cgi-bin/sse.dll?_phsrc%3DTAU175%26_phstart%3DsuccessSource%26usePUBJs%3Dtrue%26indiv%3D1%26dbid%3D1068%26gsln%3Dmalburg%26qh%3D895da974dddf2d4a5d7bfa8f5d82c127%26new%3D1%26rank%3D1%26uidh%3Dily%26redir%3Dfalse%26gss%3Dangs-d%26pcat%3D40%26fh%3D18%26h%3D2919728%26recoff%3D%26ml_rpos%3D19%26queryId%3Dcc7d96dc31948cad582b384f9f2535a3&treeid=&personid=&hintid=&queryId=cc7d96dc31948cad582b384f9f2535a3&usePUB=true&_phsrc=TAU175&_phstart=successSource&usePUBJs=true&lang=en-US#?imageId=K_1717_080476-0629';
			var adic = 0;
			var pad = "0000";
			var result = (pad+(1+i)).slice(-pad.length);
			sorc0 = sorc0.replace('080476-0629','080476-'+result);
			sorc=sorc0;
			casper.thenOpen(sorc, function(){
					casper.wait(3500, function(){
						this.capture('LIST VIEW.png');
						casper.waitForSelector("body div.ng-scope div.headerHolder.ng-scope div#headerContainer nav.header div.buttons div#saveMenuDiv.ng-scope button#saveMenuBtn.ancBtn.lrg.iconAfter.iconArrowDownAfter.ng-binding",
							function pass () {
								this.echo("Page loaded!");
								
								//IF YOU WANT, THIS GIVES THE TOTAL OF PAGES THAT SHOWS ON THE BOTTOM CENTER PART OF THE VIEWER
	/* 							var tot = this.evaluate(function(){
									if(document.querySelector('body div.ng-scope div#footer div.paging.ng-scope div.imageWidget div.pageCountWrap div.imageNum.pageCountWrapInner span.imageCountText.ng-binding')){
										return document.querySelector('body div.ng-scope div#footer div.paging.ng-scope div.imageWidget div.pageCountWrap div.imageNum.pageCountWrapInner span.imageCountText.ng-binding').innerHTML;
								   }
								});
								this.echo(tot); */
								
								casper.click('body div.ng-scope div.headerHolder.ng-scope div#headerContainer nav.header div.buttons div#saveMenuDiv.ng-scope button#saveMenuBtn.ancBtn.lrg.iconAfter.iconArrowDownAfter.ng-binding');
								casper.click('body div.ng-scope div.headerHolder.ng-scope div#headerContainer nav.header div.buttons div#saveMenuDiv div.headerMenu.saveMenu.subCon.subConShdw div.headerMenuContainer button.link:nth-child(5)');	
									adic++;
									casper.waitForSelector("body div.ng-scope div#saveImage.noDisplay iframe",
										function pass () {
											this.echo("Page loaded!");

											var imgsrc = this.evaluate(function(){
												if(document.querySelector('body div.ng-scope div#saveImage.noDisplay iframe')){
													return document.querySelector('body div.ng-scope div#saveImage.noDisplay iframe').src;
											   }
											});
                      //WHEN THE "SAVE TO YOUR COMPUTER" BUTTON IS CLICKED, IT TRIGGERS THE DOWNLOAD. HERE IT REPLACES THE LINK STRING "DOWNLOAD" BY "VIEW", WHICH ALLOWS IT TO BE VIEWED AND DOWNLOADED BY BETTERDOWNLOAD
											imgsrc= imgsrc.replace('download','view');
											this.echo(imgsrc);
											
											casper.thenOpen(imgsrc, function(){
												
												casper.waitForSelector("body img",
													function pass () {
														this.echo("Page loaded!");
														betterDownload({
															casper: casper,
															url: imgsrc,
															targetFilepath: 'dataD/'+adic+'.jpg'
														});
													},
													function fail () {
														this.echo("Did not load element");
														var fs = require('fs');
														fs.write('dataD/'+adic+'.jpg','w');
													},
													250000 // timeout limit in milliseconds
												);
												
											});
											
										},
										function fail () {
											this.echo("Did not load element");
											var fs = require('fs');
											fs.write('dataD/'+adic+'.jpg','w');
										},
										250000 // timeout limit in milliseconds
									);
							},
							function fail () {
								this.echo("Did not load element");
							},
							250000 // timeout limit in milliseconds
						);
					});	
			});
			
			i++;
		};		
	});	
}).run();
