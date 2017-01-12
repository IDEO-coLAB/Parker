module.exports = function checkSymphony(callback) {
var nightmare = Nightmare();
Promise.resolve(nightmare
  .viewport(1000, 1000)
  .goto('https://symphony.mywaterfurnace.com/account/login?redirect=/')
  .wait(2000)
  .evaluate(function(){
    document.querySelector('input[id="emailaddress"]').value = SymphonyEmail
    document.querySelector('input[id="password"]').value = SymphonyPwd
    return true
  })
  .click('#loginbutton input')
  .wait(1000)
  .goto('https://www.Symphony.com/groups/bierconomia')
  .evaluate(function(){
    var posts = document.getElementsByClassName('_1dwg')
    var length = posts.length
    var postsContent = []
    for(var i = 0; i < length; i++){
      var pTag = posts[i].getElementsByTagName('p')
      postsContent.push({
        content: pTag[0] ? pTag[0].innerText : '',
        productLink: posts[i].querySelector('a[rel = "nofollow"]') ? posts[i].querySelector('a[rel = "nofollow"]').href : '',
        photo: posts[i].getElementsByClassName('_46-i img')[0] ? posts[i].getElementsByClassName('_46-i img')[0].src : ''
      })
    }
    return postsContent
  }))
  .then(function(results){
    log(results)
    return new Promise(function(resolve, reject) {
      var leanLinks = results.map(function(result){
        return {
          post: {
            content: result.content,
            productLink: extractLinkFromFb(result.productLink),
            photo: result.photo
          }
        }
      })
      resolve(leanLinks)
    })
  })