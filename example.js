var Nightmare = require('nightmare');   
const path = require('path');
nightmare = Nightmare();

var args = process.argv.slice(2);
var proxystr = 'socks4://' + args[1].replace(/"/g, '');
var uastr = args[2].replace(/"/g, '');
var height = args[3].replace(/"/g, '');
var width = args[4].replace(/"/g, '');

nightmare = Nightmare({ 
  show: true,
  openDevTools: {
    mode: 'detach'
  },
  webPreferences: {
    preload: path.resolve(args[0]),
  },
  switches: {
    'proxy-server': proxystr,
  },

});
                                                                                                                                                                              
 
//var search_term='bluestacks for pc';
                                                                                                                                                                   
 nightmare
  .useragent(uastr)
  .goto('https://www.google.com')
  //.type('#lst-ib', search_term)
  //.click('#tsf')
  //.wait(100000)
  //.end()

    .then(function (result) {
      console.log(result)
    })
    .catch(function (error) {
      console.error('Error:', error);
    });