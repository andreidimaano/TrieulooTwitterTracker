//import {gameID, summonerName} from './index.js';
var WArr = []
var LArr = []
var sumName = summonerName
var result = true
if (result) {
    var currentStr = WArr[Math.floor(Math.random() * WArr.length)];
    console.log(currentStr)
}
else {
    var currentStr = LArr[Math.floor(Math.random() * LArr.length)];
    console.log(currentStr)
}
console.log(`${currentStr}.format(x, summonerName)`)

// var arr = ['~ bloop', '~ doop', '~ floop']
// var name = 'TrieuLoo'
// var resultArr = arr.map(function(x){return x.replace(/x/g, name);});
// console.log(resultArr)
// for (i in resultArr) {
//   console.log(resultArr[i])
// }