const fs = require('fs')
const request = require('request')

// const crawlItem = async function (itemUrl) {
//   console.log('hehe');
//   let data = null;
//   try {
//     data = await new Promise((resolve, reject) => {
//       request(itemUrl, (err, response, body) => {
//         console.log('request done');
//         if (err) {
//           console.log('hi');
//           // console.log(err);
//           return reject(err)
//         }
//         if (response.statusCode != 200) {
//           console.log('ho');
//           return reject(`Got ${response.statusCode} while connecting to itemUrl`);
//         }
//         return resolve(body)
//       })
//     })
//     console.log('ok');
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
//   fs.writeFileSync('out.html', data)
//   console.log('done');
// }

var crawlItem = async function (itemUrl) {
  // console.log('hehe');
  let data = null;
  try {
    data = await new Promise((resolve, reject) => {
      const exec = require('child_process').exec;
      let cmd = `phantomjs utils/parseItem.js "${itemUrl}"`
      // console.log('executing ' + cmd);
      exec(cmd, (err, stdout, stderr) => {
        console.log('executed');
        if (err) {
          return reject(err)
        }
        // console.log(`aaa'${stdout}'aaa`);
        return resolve(stdout)
      })
    })
    // console.log('ok');
  } catch (e) {
    console.log(e);
    return null;
  }
  // console.log('=============');
  // console.log(data);
  // console.log('=============');
  data = JSON.parse(data)
  console.log(data);
  // fs.writeFileSync('out.html', data)
  // console.log('done');
}

// crawlItem('https://shopee.vn/i.27844888.552496890')

var crawlShopPage = async function (shopId, page, tmp) {
  // console.log('hehe');
  var shopUrl = `https://shopee.vn/shop/` + shopId + `/search?order=asc&sortBy=price&page=${page > 0 ? page : 0}`
  var data = null;
  try {
    data = await new Promise((resolve, reject) => {
      const exec = require('child_process').exec;
      var cmd = `phantomjs utils/parseShop.js "${shopUrl}" ${page > 0 ? page : 0}`
      console.log('executing ' + cmd);
      exec(cmd, (err, stdout, stderr) => {
        console.log('executed');
        if (err) {
          return reject(err)
        }
        // console.log(`aaa'${stdout}'aaa`);
        return resolve(stdout)
      })
    })
    console.log('ok');
  } catch (e) {
    console.log(e);
    return null;
  }
  data = JSON.parse(data)
  // console.log(data);
  if (data && data.length > 0) {
    // arr = arr.concat(data)
    tmp = tmp.concat(data)
    console.log('done page ' + page);
    setTimeout(function () {
      crawlShopPage(shopId, page + 1, tmp);
    }, 100)
  } else {
    fs.writeFileSync('data.json', JSON.stringify(tmp, null, 2))
    console.log('done all pages');
  }
}

var arr = []
var crawlShop = function (shopId, tmp) {
  crawlShopPage(shopId, 0, tmp)
}

// crawlShop('27844888', arr)

let items = JSON.parse(fs.readFileSync('./data.json'))
console.log(items.length);
for (var i = 0; i < 3; i++) {
  let item = items[i];
  crawlItem(item.url)
}