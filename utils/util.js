function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

function http(url, statu) {

  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      method: 'Get',
      dataType: 'json',
      success: function(res) {
        resolve(res.data.subjects, statu);
      }
    })
  })
}
function connectActors(casts){
  var castsString="";
  for(let actor of casts){
    castsString = castsString+actor.name+"/";
  }
  return(castsString.slice(0, castsString.length-1));
}
function moveDetail(event) {
  wx.navigateTo({
    url: '/pages/moves/movedetail/movedetail?id=' + event.currentTarget.dataset.moveid
  })
}
function connectKinds(kinds){
  var kindString = "";
  for (let kind of kinds) {
    kindString = kindString + kind + "、";
  }
  return (kindString.slice(0, kindString.length - 1));
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  connectActors: connectActors,
  moveDetail:moveDetail,
  connectKinds: connectKinds
}