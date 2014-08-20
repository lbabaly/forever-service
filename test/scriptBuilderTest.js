var should = require('should');
var scriptBuilder = require('../lib/scriptBuilder');
var fs = require('fs-extra');

describe('Generate initd script', function(){

	describe('Test Amazon Linux scripts', function(){

		it('should validated arguments', function(){
			
			(function(){
			  	scriptBuilder.gen();
			}).should.throw();

			//No callback
			(function(){
			  	scriptBuilder.gen({platform: 'amazon'});
			}).should.throw();

			//Invalid callback
			(function(){
			  	scriptBuilder.gen({platform: 'amazon'}, 0);
			}).should.throw();

			//All valid
			(function(){
			  	scriptBuilder.gen({platform: 'amazon'}, function(){});
			}).should.not.throw();
		});

		it('should generate script for amazon linux', function(done){
			scriptBuilder.gen(
				{
					platform: "amazon",
					nodescript: "app.js",
					service: "test",
					displayname:"Test service"
				},
				function(err, script){
					if(err) throw err;

					fs.writeFileSync('testinitd.log', script.initd);
					//console.log(script);
					done();
				}
			);
		});

	});
});