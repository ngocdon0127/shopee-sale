var system = require('system');
var page = require('webpage').create();
var fs = require('fs')

page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36';
page.settings.proxy = 'socks://192.168.193.13:3128'
// console.log(system.args.length);
if (system.args.length < 2) {
  console.log('{"error": "missing URL"}');
  phantom.exit();
}

var address = system.args[1]
var x = 0;
page.onLoadFinished = function () {
  // console.log('load finished');
  fs.write('item27195.html', page.content, 'w');
  page.render('example.png')
  // console.log('written');
  try {
    var stockCount = page.evaluate(function () {
      try {
        return document.getElementsByClassName('shopee-product-info-body__order-quantity__stock-count')[0].innerText;
      } catch (e) {

      }
    })
    var itemPrice = page.evaluate(function () {
      try {
        return document.getElementsByClassName('shopee-product-info__header__real-price')[0].innerText;
      } catch (e) {

      }
    })
    var itemName = page.evaluate(function () {
      try {
        return document.getElementsByClassName('shopee-product-info__header__text')[0].innerText;
      } catch (e) {

      }
    })
    // console.log(itemName);
    // console.log(stockCount);
    console.log(JSON.stringify({
      position: 'onfinish',
      x: x++,
      name: itemName,
      stockCount: stockCount,
      price: itemPrice
    }));
  } catch (e) {
  }
  // phantom.exit();
}
// console.log('opening ' + address);
page.open(address, function(status) {
  // console.log("Status: " + status);
  // if(status === "success") {
  //   page.render('example.png');
  // }
  // var title = page.evaluate(function () {
  //   return document.title;
  // })
  // var div = page.evaluate(function () {
  //   document.getElementsByClassName('shopee-product-info-body__info-content shopee-product-info-body__variations')[0].children[3].click()
  // })
  try {
    var stockCount = page.evaluate(function () {
      try {
        return document.getElementsByClassName('shopee-product-info-body__order-quantity__stock-count')[0].innerText;
      } catch (e) {

      }
    })
    var itemPrice = page.evaluate(function () {
      try {
        return document.getElementsByClassName('shopee-product-info__header__real-price')[0].innerText;
      } catch (e) {

      }
    })
    var itemName = page.evaluate(function () {
      try {
        return document.getElementsByClassName('shopee-product-info__header__text')[0].innerText;
      } catch (e) {

      }
    })
    // console.log(itemName);
    // console.log(stockCount);
    console.log(JSON.stringify({
      name: itemName,
      stockCount: stockCount,
      price: itemPrice
    }));
  } catch (e) {

  } finally {
    phantom.exit();
  }
});