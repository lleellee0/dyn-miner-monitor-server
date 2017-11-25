var express = require('express');
var router = express.Router();

const miner_arr = new Array();
const miner_arr_info = {};

/* GET miners listing. */
router.get('/', function(req, res, next) {
  res.json(miner_arr);
});

router.get('/info', function(req, res, next) {
  miner_arr_info.hashrate = 0;
  for(let i = 0; i < miner_arr.length; i++) {
    miner_arr_info.hashrate += parseInt(miner_arr[i].hashrate);
  }

  miner_arr_info.balance = 0;
  for(let i = 0; i < miner_arr.length; i++) {
    miner_arr_info.balance += parseFloat(miner_arr[i].balance);
  }

  res.json(miner_arr_info);
});


router.post('/:miner_name/:hashrate/:balance', function(req, res, next) {
  for(let i = 0; i < miner_arr.length; i++) {
    if(miner_arr[i].miner_name === req.params.miner_name) {  // renew miner info
      miner_arr[i].hashrate = req.params.hashrate;
      miner_arr[i].balance = req.params.balance;
      miner_arr[i].sync_time = new Date();
      miner_arr[i].is_dead = false;

      res.json(miner_arr[i]);
      return;
    }
  }

  // create miner info
  let obj = {};
  obj.miner_name = req.params.miner_name;
  obj.hashrate = req.params.hashrate;
  obj.balance = req.params.balance;
  obj.sync_time = new Date();
  obj.is_dead = false;
  miner_arr.push(obj);

  res.json(obj);
});

const checkDeadMiner = () => {
  for(let i = 0; i < miner_arr.length; i++) {
    if(miner_array[i].sync_time < Date.now() - (120 * 1000)) // 120초 지났다면 죽은걸로 간주 (60초마다 싱크하긴 하지만 충분한 유예시간을 부여)
    miner_array[i].is_dead = true;
  }
}

setInterval(checkDeadMiner, 120 * 1000);

module.exports = router;
