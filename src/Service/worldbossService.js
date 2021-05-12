var bossStatus = function () 
{
    let api = 'https://world-boss-timer-bdoth.firebaseio.com/world_boss.json';

    request({url: api, json: true}, function(error, response, data){
        if(!error){
          listBoss = [];
          findBossNextSpawn(data);      
          sendBossTimer(listBoss);
  
        }else{
          console.log(error);
        }
    })

}
module.exports.bossStatus = bossStatus;