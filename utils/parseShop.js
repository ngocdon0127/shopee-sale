var system = require('system');
var page = require('webpage').create();
// console.log('e');
// phantom.exit()

page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36';
// page.settings.proxy = 'socks://192.168.193.13:3128'
// console.log(system.args.length);
if (system.args.length < 2) {
  console.log('{"error": "missing URL"}');
  phantom.exit();
}

var address = system.args[1];
// console.log('opening ' + address);
page.open(address, function(status) {
  // console.log("Status: " + status);
  // if (status === "success") {
  //   page.render('example' + system.args[2] + '.png');
  // }
  // var title = page.evaluate(function () {
  //   return document.title;
  // })
  document.getElementsByClassName('shop-search-result-view')[0]
  var items = page.evaluate(function () {
    if (!document.getElementsByClassName('shop-search-result-view')[0]) {
      return null;
    }
    var result = []
    var divs = document.getElementsByClassName('shop-search-result-view')[0].children[0].children;
    // console.log(divs.length);
    for (var i = 0; i < divs.length; i++) {
      var div = divs[i];
      var item = {
        url: decodeURIComponent(div.children[0].href),
        name: decodeURIComponent(div.children[0].title)
      }
      result.push(item)
    }
    return result
  });
  console.log(JSON.stringify(items));
  phantom.exit();
});